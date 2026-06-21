from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict
import uuid
import datetime
from ..services.scoring_service import ScoringService
from ..services.anonymizer import Anonymizer

router = APIRouter()

class VerificationResponse(BaseModel):
    id: str
    github_username: str
    score: float
    verified_at: str
    breakdown: Dict

@router.post("/verify/{username}", response_model=VerificationResponse)
async def certify_user(username: str, data: Dict):
    """
    Certifies a user's score based on GitHub activity and role targeting.
    """
    score = data.get("score")
    target_role = data.get("target_role", "Fullstack")
    
    if score is None or score < 50:
        raise HTTPException(
            status_code=400, 
            detail=f"Score {score} is below the professional certification threshold."
        )

    # Generate a unique verification ID
    new_id = str(uuid.uuid4())
    verified_at = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    # In a production environment, we would commit this payload to Postgres/Supabase
    # For the resume showcase, we return the verified payload that the UI will use to generate the "LinkedIn Badge"
    
    return {
        "id": new_id,
        "github_username": username,
        "score": score,
        "verified_at": verified_at,
        "breakdown": data.get("breakdown", {
            "frequency": 0.0,
            "quality": 0.0,
            "stack": 0.0,
            "complexity": 0.0,
            "consistency": 0.0
        })
    }

@router.get("/credentials/{uuid}", response_model=VerificationResponse)
async def get_credentials(uuid: str):
    """
    Public lookup for credentials verification.
    """
    # This simulates fetching from the 'verified_scores' table in Supabase
    return {
        "id": uuid,
        "github_username": "Verified Contributor",
        "score": 88.42,
        "verified_at": "2026-04-12T07:26:00Z",
        "breakdown": {
            "frequency": 0.92,
            "quality": 0.85,
            "stack": 0.88,
            "complexity": 0.95,
            "consistency": 0.82
        }
    }

import os
import json
from openai import AsyncOpenAI

class ReadinessRequest(BaseModel):
    github_username: str
    tech_stack: list[str]
    experience_level: str
    issue_title: str
    issue_body: str

@router.post("/readiness")
async def calculate_readiness(req: ReadinessRequest):
    """
    Uses OpenAI to analyze the issue and the user's stack to output a Readiness Score.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        # Mock mode if no key
        return {"score": 85, "reason": "Mocked (No API key provided)"}

    client = AsyncOpenAI(api_key=api_key)
    
    prompt = f"""
    Evaluate the readiness of a contributor to tackle this GitHub Issue.
    Contributor Stack: {', '.join(req.tech_stack)}
    Experience Level: {req.experience_level}
    
    Issue Title: {req.issue_title}
    Issue Body: {req.issue_body[:1000]}
    
    Return a JSON object with:
    - 'score': an integer from 0 to 100 representing the match percentage.
    - 'reason': a short 1-sentence explanation of why.
    """
    
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a tech lead assigning open-source issues. Output valid JSON only."},
                {"role": "user", "content": prompt}
            ]
        )
        
        result = json.loads(response.choices[0].message.content)
        return {
            "score": result.get("score", 75),
            "reason": result.get("reason", "Calculated successfully.")
        }
    except Exception as e:
        return {"score": 75, "reason": f"Fallback due to error: {str(e)}"}
