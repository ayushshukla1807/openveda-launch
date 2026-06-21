import os
import asyncio
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "openveda_worker",
    broker=redis_url,
    backend=redis_url
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

@celery_app.task(name="ingest_repo_task")
def ingest_repo_task(repo_owner: str, repo_name: str, limit: int):
    from .services.vector_service import VectorService
    vector_service = VectorService()
    result = asyncio.run(
        vector_service.ingest_repo_issues(repo_owner, repo_name, limit)
    )
    return result
