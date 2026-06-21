from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx
import time
import os
import redis.asyncio as redis

app = FastAPI(
    title="OpenVeda Unified Gateway API",
    description="Enterprise API Gateway routing to internal microservices with Redis Token Bucket Rate Limiting.",
    version="2.0.0"
)

# Initialize Redis client
# If REDIS_URL is not set, use a dummy memory dictionary for mock environments
redis_url = os.getenv("REDIS_URL")
if redis_url:
    redis_client = redis.from_url(redis_url)
else:
    redis_client = None

# In-memory fallback if Redis is not available
MOCK_REDIS = {}

# Token Bucket configuration (Dynamic via ENV)
RATE_LIMIT = int(os.getenv("RATE_LIMIT", "5"))        # Requests per second
CAPACITY = int(os.getenv("RATE_CAPACITY", "20"))      # Max burst
async def check_rate_limit(client_ip: str) -> bool:
    """Token Bucket rate limiting using Redis."""
    if not redis_client:
        # Mock implementation for demo without Redis container
        now = time.time()
        bucket = MOCK_REDIS.get(client_ip, {"tokens": CAPACITY, "last_update": now})
        
        elapsed = now - bucket["last_update"]
        bucket["tokens"] = min(CAPACITY, bucket["tokens"] + elapsed * RATE_LIMIT)
        bucket["last_update"] = now
        
        if bucket["tokens"] < 1:
            MOCK_REDIS[client_ip] = bucket
            return False
            
        bucket["tokens"] -= 1
        MOCK_REDIS[client_ip] = bucket
        return True

    # Real Redis Token Bucket Lua Script
    script = """
    local key = KEYS[1]
    local rate = tonumber(ARGV[1])
    local capacity = tonumber(ARGV[2])
    local now = tonumber(ARGV[3])
    local requested = 1
    
    local bucket = redis.call("HMGET", key, "tokens", "last_update")
    local tokens = tonumber(bucket[1])
    local last_update = tonumber(bucket[2])
    
    if not tokens then
        tokens = capacity
        last_update = now
    end
    
    local elapsed = now - last_update
    tokens = math.min(capacity, tokens + elapsed * rate)
    
    if tokens < requested then
        return 0
    else
        redis.call("HMSET", key, "tokens", tokens - requested, "last_update", now)
        redis.call("EXPIRE", key, math.ceil(capacity / rate))
        return 1
    end
    """
    now = time.time()
    result = await redis_client.eval(script, 1, client_ip, RATE_LIMIT, CAPACITY, now)
    return result == 1

@app.middleware("http")
async def rate_limiter_middleware(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    
    allowed = await check_rate_limit(client_ip)
    if not allowed:
        return JSONResponse(status_code=429, content={"detail": "Too many requests. Token bucket exhausted."})
    
    response = await call_next(request)
    return response

@app.post("/ai/search")
async def ai_search(request: Request):
    """Unified Gateway route to the AI Microservice with Redis Caching."""
    import json
    import hashlib
    
    body = await request.json()
    
    # 1. Check Redis Cache
    cache_key = None
    if redis_client:
        body_str = json.dumps(body, sort_keys=True)
        query_hash = hashlib.md5(body_str.encode()).hexdigest()
        cache_key = f"cache:ai:search:{query_hash}"
        
        cached_result = await redis_client.get(cache_key)
        if cached_result:
            return json.loads(cached_result)
    
    # 2. Internal routing to the AI microservice running on port 8001
    ai_host = os.getenv("AI_SERVICE_URL", "http://localhost:8001")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{ai_host}/search", json=body)
            response.raise_for_status()
            data = response.json()
            
            # 3. Cache the successful result for 1 hour (3600s)
            if redis_client and cache_key:
                await redis_client.setex(cache_key, 3600, json.dumps(data))
                
            return data
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"AI Service unavailable: {str(e)}")

@app.post("/ai/chat")
async def ai_chat(request: Request):
    """Unified Gateway route to the AI Chatbot."""
    body = await request.json()
    
    ai_host = os.getenv("AI_SERVICE_URL", "http://localhost:8001")
    async with httpx.AsyncClient() as client:
        try:
            # We enforce a timeout since LLM calls can take a few seconds
            response = await client.post(f"{ai_host}/chat", json=body, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"AI Chat Service unavailable: {str(e)}")

@app.get("/health")
async def health_check():
    return {
        "status": "ok", 
        "service": "Gateway API", 
        "redis_connected": redis_client is not None,
        "timestamp": time.time()
    }
