import asyncio
from fastapi import FastAPI
from app.worker.consumer import start_worker

app = FastAPI(title="Smart Diet Analysis Engine")

@app.on_event("startup")
async def startup_event():
    # 서버가 켜질 때 백그라운드에서 워커 실행
    asyncio.create_task(start_worker())

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Analysis Engine"}