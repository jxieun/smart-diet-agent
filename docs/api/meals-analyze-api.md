# 🥗 스마트 식단 관리 시스템 API 명세 (API Specification)

## 📋 문서 정보
| 항목 | 내용 |
| :--- | :--- |
| **최종 수정일** | 2026-03-08 |
| **기준 URL** | `http://localhost:3000` |
| **인증 방식** | JWT Bearer Token (Authorization Header) |

---

## 🔍 메뉴 분석 API (Analysis API) - Saga 패턴
사용자가 업로드한 메뉴판 이미지를 분석하여 영양 정보를 추출하는 비동기 프로세스의 시작점입니다.

### 1. 메뉴판 분석 요청 (Analyze)
메뉴판 이미지를 업로드하여 분석 태스크를 생성하고 RabbitMQ 큐에 등록합니다.

- **Endpoint**: `POST /meals/analyze`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  | Key | Type | Description |
  | :--- | :--- | :--- |
  | **image** | File | 메뉴판 이미지 파일 (jpeg, png, gif / 최대 5MB) |
- **Validation**: 
  - 파일 버퍼가 아닌 `mimetype`을 직접 검증하여 `diskStorage` 환경에서의 안정성을 확보함
- **Response (201 Created)**: `AnalysisResponseDto`
  ```json
  {
    "id": "8cbe8489-7e5d-4a1e-8f92-ec2e31647413",
    "status": "PENDING",
    "imageUrl": "uploads/image-1710000000.png",
    "targetCalories": 2500,
    "result": null,
    "errorMessage": null,
    "createdAt": "2026-03-08T12:00:00Z"
  }
   ```

### 2. 분석 태스크 상태 조회 (Get Status)
요청한 분석 작업의 현재 진행 상태 및 최종 AI 분석 결과를 조회합니다.

- **Endpoint**: `GET /meals/tasks/:taskId`
- **Path Parameters**:
  - `taskId`: 분석 요청 시 발급받은 작업 ID (UUID)
- **보안**: 본인이 요청한 분석 작업만 조회 가능 (404 처리로 타인 접근 차단)
- **Response (200 OK)**: `AnalysisResponseDto`
  ```json
  {
    "id": "8cbe8489-7e5d-4a1e-8f92-ec2e31647413",
    "status": "COMPLETED", // PENDING, PROCESSING, COMPLETED, FAILED
    "imageUrl": "uploads/image-1710000000.png",
    "targetCalories": 2500,
    "result": {
      "menuName": "닭가슴살 샌드위치",
      "estimatedCalories": 420,
      "analysis": "목표 칼로리 대비 적절한 식단입니다."
    },
    "errorMessage": null,
    "createdAt": "2026-03-08T12:00:00Z"
  }
   ```

### ⚠️ 추가 상태 코드 (Status Codes)
- 201 Created: 이미지 업로드 및 분석 작업 생성 성공 (RabbitMQ 메시지 발행 완료)

- 400 Bad Request: 허용되지 않은 파일 형식(MIME Type)이거나 파일 용량이 5MB를 초과함

- 404 Not Found: 존재하지 않는 taskId이거나 해당 작업의 소유자가 아님