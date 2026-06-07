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
        # Intelligent fallback for resume showcase
        q = request.question.lower()
        if "what is openveda" in q:
            return {"answer": "OpenVeda is 'The Contribution Engine' designed to bridge the gap between students and top-tier open-source programs like LFX, GSoC, and Outreachy through AI-powered playbooks and mentorship."}
        if "lfx" in q or "linux foundation" in q:
            return {"answer": "LFX Mentorship is a prestigious program by the Linux Foundation. OpenVeda helps you dominated this program by auditing CNCF projects and submitting proactive PRs before the application window even opens."}
        if "gsoc" in q or "google summer of code" in q:
            return {"answer": "GSoC 2027 is the gold standard for global open-source mentorship. Our playbooks focus on high-impact projects like Wikimedia and Microcks, helping you secure selection through veteran-authored proposals."}
        
        return {
            "answer": "OpenVeda AI is currently in 'Showcase Mode'. While I'm ready to answer complex RAG queries with an API key, my current core mission is to guide you through the OpenVeda ecosystem. Try asking about 'LFX' or 'What is OpenVeda'!"
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
