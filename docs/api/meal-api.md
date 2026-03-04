# 🥗 식단 관리 및 사용자 프로필 API 명세 (API Specification)

## 식단 관리 API (Meal API) 상세

| 항목 | 내용 |
| :--- | :--- |
| **날짜** | 2026-03-04 |
| **기준 URL** | `http://localhost:3000` |
| **인증 방식** | JWT Bearer Token (Authorization Header) |

---

## 🔐 인증 공통 사항
- 본 명세서의 모든 API는 **로그인 후 발급받은 JWT 토큰**이 필요합니다.
- 헤더 예시: `Authorization: Bearer <JWT_TOKEN>`

---

## 🥗 식단 관리 API (Meal API)

### 1. 식단 기록 생성 (Create)
새로운 식단 기록을 저장합니다.
- **Endpoint**: `POST /meals`
- **Request Body**:
  ```json
  {
    "title": "닭가슴살 샐러드",
    "mealType": "LUNCH", // BREAKFAST, LUNCH, DINNER, SNACK
    "calories": 450,
    "carbs": 30,    // 선택 사항
    "protein": 35,  // 선택 사항
    "fat": 10       // 선택 사항
  }
   ```
- **Response (201 Created)**: MealResponseDto 반환 (보안을 위해 userId 제외)

### 2. 내 모든 식단 조회 (Find All)
현재 로그인한 사용자가 작성한 모든 식단 목록을 최신순으로 가져옵니다.

- **Endpoint**: `GET /meals`
- **인증**: JWT Bearer Token 필요
- **정렬**: `mealDate` 기준 내림차순 (Latest First)
- **Response (200 OK)**: `MealResponseDto[]`

### 3. 식단 상세 조회 (Find One)
특정 식단 기록의 상세 정보를 조회합니다.

- **Endpoint**: `GET /meals/:id`
- **Validation**: 본인의 기록이 아닐 경우 `404 Not Found`를 반환하여 데이터 존재 여부를 노출하지 않습니다.
- **Response (200 OK)**: `MealResponseDto`

### 4. 식단 수정 (Update)
작성한 식단 정보를 수정합니다.

- **Endpoint**: `PATCH /meals/:id`
- **Request Body**: `UpdateMealDto` (수정할 필드만 선택적으로 포함 가능)
- **Response (200 OK)**: 수정이 완료된 `MealResponseDto`

### 5. 식단 삭제 (Delete)
식단 기록을 영구적으로 삭제합니다.

- **Endpoint**: `DELETE /meals/:id`
- **보안**: 소유권 검증 후 삭제를 실행합니다.
- **Response (200 OK)**: 삭제 성공 메시지 또는 삭제된 데이터 객체

---

## 👤 사용자 인증 API (Auth API)

### 1. 내 정보 조회 (Profile)
로그인한 사용자의 프로필 정보를 가져옵니다.

- **Endpoint**: `GET /auth/profile`
- **보안**: `UserResponseDto`를 사용하여 비밀번호 해시값 노출을 차단합니다.
- **Response (200 OK)**:
```json
{
  "message": "내 정보 조회 성공",
  "user": {
    "id": "uuid-1234",
    "email": "rose@example.com",
    "nickname": "로즈",
    "createdAt": "2026-03-02T..."
    // password 필드는 보안을 위해 제외됨
  }
}
```

---

## ⚠️ 주요 상태 코드 (Status Codes)
- 200 OK: 요청이 성공적으로 처리되었습니다.

- 201 Created: 새로운 리소스(식단)가 성공적으로 생성되었습니다.

- 400 Bad Request: 입력 데이터가 유효하지 않습니다. (예: 칼로리에 문자 입력 등)

- 401 Unauthorized: 유효한 JWT 토큰이 없거나 만료되었습니다.

- 404 Not Found: 요청한 데이터가 없거나, 소유권이 없는 기록에 접근을 시도했습니다.