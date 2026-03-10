import asyncio
import json
from fastapi import FastAPI
import aio_pika
from schema import AnalysisTaskMessage

app = FastAPI(title="Smart Diet Analysis Engine")

# 🐰 RabbitMQ 설정값
RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"
EXCHANGE_NAME = "menu_analysis_exchange"
QUEUE_NAME = "menu_analysis_queue"
ROUTING_KEY = "analyze.request"

async def process_message(message: aio_pika.IncomingMessage):
    async with message.process():
        # 1. 메시지 수신
        body = json.loads(message.body.decode())
        task = AnalysisTaskMessage(**body)
        
        print(f"🔍 [분석 시작] Task ID: {task.taskId}")
        print(f"📸 이미지 경로: {task.imageUrl}")
        
        # TODO: 실제 AI 분석(OCR 등) 로직이 들어갈 예정🥗
        await asyncio.sleep(2) # 분석 중인 척...
        
        print(f"✅ [분석 완료] Task {task.taskId} 처리 성공!")

async def start_rabbitmq():
    # 2. RabbitMQ 연결
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel()

    # 3. 통로(Exchange) 및 바구니(Queue) 설정
    exchange = await channel.declare_exchange(EXCHANGE_NAME, type="topic", durable=True)
    queue = await channel.declare_queue(QUEUE_NAME, durable=True)
    
    # 바구니를 통로에 연결 (Binding)
    await queue.bind(exchange, routing_key=ROUTING_KEY)

    # 4. 메시지 소비 시작
    await queue.consume(process_message)
    print(f"🚀 RabbitMQ 리스너 가동 중... ({QUEUE_NAME})")

@app.on_event("startup")
async def startup_event():
    # 서버가 켜질 때 RabbitMQ 리스너도 같이 실행
    asyncio.create_task(start_rabbitmq())

@app.get("/")
def read_root():
    return {"status": "Analysis Engine is running!"}