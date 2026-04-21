from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import verify

app = FastAPI(
    title="OpenVeda Scoring Service",
    description="Calculates open-source readiness scores and issues verifiable certificates.",
    version="1.0.0"
)

# Enable CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(verify.router, prefix="/api", tags=["Verification"])

@app.get("/")
async def root():
    return {"status": "online", "service": "Scoring Service"}
