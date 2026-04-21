from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .services.rag_service import RAGService
import os

app = FastAPI(
    title="OpenVeda AI Mentorship Service",
    description="RAG-powered mentorship bot providing playbook-specific guidance.",
    version="1.0.0"
)

# Enable CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Service
rag = RAGService()

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handles user questions about open-source programs and playbooks.
    """
    if not os.getenv("OPENAI_API_KEY"):
        # Fallback for resume showcase if key is missing
        return {
            "answer": "OpenVeda AI is currently in 'Showcase Mode'. To enable live RAG responses, please provide an OPENAI_API_KEY in the environment."
        }
    
    try:
        # In a real run, you'd load docs once at startup. 
        # For simplicity in this demo, the service handles its own state.
        answer = rag.ask_question(request.question)
        
        # RetrievalQA invoke returns a dict in newer langchain versions
        if isinstance(answer, dict):
            answer = answer.get("result", str(answer))
            
        return {"answer": str(answer)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"status": "online", "service": "AI Mentorship Service"}
