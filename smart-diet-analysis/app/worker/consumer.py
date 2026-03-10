import aio_pika
import json
import os
from app.schemas.analysis import AnalysisTaskMessage
from app.services.ocr_service import ocr_service

# RabbitMQ 설정 (나중에 config.py로 옮길 예정)
RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"
QUEUE_NAME = "menu_analysis_queue"

async def process_message(message: aio_pika.IncomingMessage):
    async with message.process():
        body = json.loads(message.body.decode())
        task = AnalysisTaskMessage(**body)
        
        print(f"🔍 [분석 시작] Task ID: {task.taskId}")
        
        # NestJS의 이미지 저장 경로와 맞춤
        # 1. imageUrl에서 앞의 '/'를 제거해주는 처리를 추가
        safe_image_path = task.imageUrl.lstrip('/')
        full_path = os.path.join("../smart-diet-backend", task.imageUrl)
        
        # 2. 이 로그를 추가해서 실제 경로를 확인해 보세요!
        print(f"📍 시스템이 찾고 있는 전체 경로: {full_path}")
        print(f"❓ 파일이 실제로 있나요?: {os.path.exists(full_path)}")
        
        # OCR 서비스 호출
        results = ocr_service.extract_text(full_path)
        
        if results:
            print(f"📝 추출된 메뉴: {results}")
        else:
            print("❌ 이미지를 찾을 수 없거나 분석에 실패했습니다.")

async def start_worker():
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel()
    queue = await channel.declare_queue(QUEUE_NAME, durable=True)
    
    await queue.consume(process_message)
    print(f"🚀 분석 엔진 워커 가동 중... ({QUEUE_NAME})")