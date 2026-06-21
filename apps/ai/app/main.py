from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from .services.rag_service import RAGService
from .services.vector_service import VectorService
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="OpenVeda AI & ML Microservice",
    description="Enterprise-grade RAG and Vector Search API for GitHub Issues.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGService()
vector_service = None

@app.on_event("startup")
async def startup_event():
    global vector_service
    # Initialize only if keys exist to prevent crashes in mock environments
    if os.getenv("OPENAI_API_KEY") and os.getenv("NEXT_PUBLIC_SUPABASE_URL"):
        vector_service = VectorService()

class ChatRequest(BaseModel):
    question: str

class IngestRequest(BaseModel):
    repo_owner: str
    repo_name: str
    issue_number: int

class SearchRequest(BaseModel):
    query: str
    limit: Optional[int] = 5

class IngestRepoRequest(BaseModel):
    repo_owner: str
    repo_name: str
    limit: Optional[int] = 30

@app.post("/ingest-repo")
async def ingest_repo(request: IngestRepoRequest):
    """Batch ingests open issues from a GitHub repository via Celery Background Worker."""
    from .worker import ingest_repo_task
    
    try:
        task = ingest_repo_task.delay(request.repo_owner, request.repo_name, request.limit)
        return {"status": "success", "message": "Batch ingestion queued to Celery.", "task_id": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ingest")
async def ingest_issue(request: IngestRequest, background_tasks: BackgroundTasks):
    """Ingests a GitHub issue, generates embeddings, and saves to pgvector."""
    if not vector_service:
        raise HTTPException(status_code=503, detail="Vector service not initialized (Missing API keys)")
    
    try:
        data = await vector_service.ingest_github_issue(
            request.repo_owner, 
            request.repo_name, 
            request.issue_number
        )
        return {"status": "success", "message": "Issue successfully ingested into vector DB", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
async def search_issues(request: SearchRequest):
    """Semantic search for Good First Issues using pgvector."""
    if not vector_service:
        # Mock response for UI testing if no keys are provided
        return {
            "status": "mock",
            "results": [
                {
                    "org_name": "appsmithorg",
                    "repo_name": "appsmith",
                    "title": "feat: add virtual scrolling to List Widget",
                    "similarity": 0.89,
                    "url": "https://github.com/appsmithorg/appsmith/issues/1240"
                }
            ]
        }
        
    try:
        results = await vector_service.search_issues(request.query, request.limit)
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    """Handles general QA about OpenVeda playbooks using LangChain RAG."""
    if not os.getenv("OPENAI_API_KEY"):
        return {"answer": "AI is in showcase mode. Add OPENAI_API_KEY to test the full LangChain RAG pipeline."}
    
    try:
        answer = rag.ask_question(request.question)
        if isinstance(answer, dict):
            answer = answer.get("result", str(answer))
        return {"answer": str(answer)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "online", "service": "AI & ML Microservice", "vector_db": vector_service is not None}
