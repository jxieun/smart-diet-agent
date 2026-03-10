# 🐍 분석 엔진 API 및 메시지 명세 (Analysis Engine Specification)

## 📋 서비스 정보
| 항목 | 내용 |
| :--- | :--- |
| **기본 URL** | `http://localhost:8000` |
| **역할** | RabbitMQ 메시지 수신 및 메뉴판 AI 분석 (OCR) |
| **상태** | 개발 중 (F-06 완료) |

---

## 🐰 RabbitMQ 메시지 수신 규격 (Message Consumer)
NestJS로부터 발행된 분석 요청 메시지를 처리하는 규격입니다.

- **Exchange**: `menu_analysis_exchange`
- **Queue**: `menu_analysis_queue`
- **Routing Key**: `analyze.request`
- **Payload Structure (JSON)**:
  ```json
  {
    "taskId": "uuid-string",
    "imageUrl": "uploads/image-path.jpg",
    "userId": "uuid-string",
    "targetCalories": 2000 // 선택 사항
  }
  ```

## 🚦 내부 상태 확인 API (Health Check)
분석 엔진의 가동 상태를 확인하기 위한 엔드포인트입니다.

### 1. 서비스 상태 조회
- Endpoint: GET /

- Response (200 OK):

 ```JSON
{
  "status": "Analysis Engine is running!"
}
 ```

## ⚠️ 트러블슈팅 기록 (Troubleshooting)
- Python 환경 충돌: 최신 OS 환경에서 python 명령어 대신 python3를 명시하여 가상환경을 구축함.

- Zsh 패턴 매칭 오류: pip install fastapi[all] 실행 시 대괄호 해석 문제를 방지하기 위해 따옴표("")를 사용하여 패키지 설치 완료.