# 🎫 [API] 인증 및 사용자 정보 관리 (F-03, F-04)

## 1. 회원가입 API
**Endpoint**: `POST /auth/signup`  
**Description**: 새로운 사용자를 생성하고 정보를 저장합니다. 기존 `UsersController`에 있던 로직을 `AuthController`로 통합하여 계정 생성 프로세스를 일원화했습니다.

### Request
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| email | 사용자 계정 이메일 | String | 필수 | No | hi@test.com |
| password | 계정 비밀번호 (최소 8자) | String | 필수 | No | password1234 |
| nickname | 서비스 활동 닉네임 | String | 필수 | No | 하이 |

### Response
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | 사용자 고유 ID (UUID) | String | - | No | 0ac631b7-... |
| email | 사용자 이메일 | String | - | No | hi@test.com |
| nickname | 사용자 닉네임 | String | - | No | 하이 |
| goalCalories | 일일 목표 칼로리 (기본값) | Number | - | No | 2000 |
| createdAt | 계정 생성 일시 | String | - | No | 2026-03-06... |

### Example
```json
{
  "id": "0ac631b7-151b-4519-9168-e878b00875aa",
  "email": "hi@test.com",
  "nickname": "하이",
  "goalCalories": 2000,
  "createdAt": "2026-03-06T09:51:57.048Z"
}
```

### Status
| status | response content |
| :--- | :--- |
| 201 | 회원가입 성공 |
| 400 | 입력값 유효성 검사 실패 (Validation Error) |
| 409 | 이미 존재하는 이메일 (Conflict) |

---

## 2. 사용자 목표 및 프로필 수정 API (F-04)
**Endpoint**: `PATCH /auth/preferences`
**Description**: 로그인한 사용자의 닉네임이나 일일 목표 칼로리를 부분적으로 수정합니다. JWT 토큰을 통해 본인 확인을 거치며, 수정된 필드만 반영됩니다.

### Request
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Authorization | Bearer {token} (Header) | String | 필수 | No | Bearer eyJhbGci... |
| nickname | 변경할 닉네임 | String | 선택 | Yes | 숲속마멜 |
| goalCalories | 수정할 목표 칼로리 | Number | 선택 | Yes | 1800 |
| activityLevel | 수정할 활동 수준 | String | 선택 | Yes | ACTIVE |

### Response
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| message | 결과 메시지 | String | - | No | 사용자 정보 수정 성공 |
| user | 수정된 사용자 정보 객체 | Object | - | No | - |
| user.nickname | 변경된 닉네임 | String | - | No | 숲속마멜 |
| user.goalCalories | 변경된 목표 칼로리 | Number | - | No | 1800 |

### Example
```json
{
  "message": "사용자 정보 수정 성공",
  "user": {
    "id": "0ac631b7-151b-4519-9168-e878b00875aa",
    "email": "hi@test.com",
    "nickname": "숲속마멜",
    "goalCalories": 1800,
    "createdAt": "2026-03-06T09:51:57.048Z"
  }
}
```

### Status
| status | response content |
| :--- | :--- |
| 200 | 수정 성공 및 업데이트된 데이터 반환 |
| 401 | 유효하지 않은 토큰 또는 토큰 누락 (Unauthorized) |
| 404 | 사용자를 찾을 수 없음 (Not Found) |