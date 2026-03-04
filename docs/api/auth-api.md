# 🎫 [API] 인증 및 사용자 정보 관리 (F-03)

## 1. 로그인 API
**Endpoint**: `POST /auth/login`  
**Description**: 사용자의 이메일과 비밀번호를 검증하고 JWT 액세스 토큰을 발급합니다.

### Request
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| email | 사용자 계정 이메일 | String | 필수 | No | rose@test.com |
| password | 사용자 계정 비밀번호 | String | 필수 | No | password1234 |

### Response
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| accessToken | API 접근을 위한 JWT 인증 토큰 | String | 필수 | No | eyJhbGciOiJIUzI1Ni... |

### Example
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Status
| status | response content |
| :--- | :--- |
| 200 | 로그인 성공 및 토큰 발급 |
| 401 | 이메일 또는 비밀번호 불일치 (Unauthorized) |

---

## 2. 내 정보 조회 API
**Endpoint**: `GET /auth/profile`  
**Description**: 전달받은 JWT 토큰을 검증하여 현재 로그인한 사용자의 프로필 정보를 반환합니다.

### Request
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Authorization | Bearer {token} (Header) | String | 필수 | No | Bearer eyJhbGci... |

### Response
| key | 설명 | value 타입 | 옵션 | Nullable | 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| message | 결과 메시지 | String | - | No | 내 정보 조회 성공 |
| user | 사용자 상세 정보 객체 | Object | - | No | - |
| user.id | 사용자 고유 ID (UUID) | String | - | No | 8cbe8489-... |
| user.email | 사용자 이메일 | String | - | No | rose@test.com |
| user.nickname | 사용자 닉네임 | String | - | No | 로즈 |
| user.goalCalories | 일일 목표 칼로리 | Number | - | Yes | 2000 |

### Example
```json
{
  "message": "내 정보 조회 성공",
  "user": {
    "id": "8cbe8489-2600-4971-9929-397873282e6b",
    "email": "rose@test.com",
    "nickname": "로즈",
    "goalCalories": 2000,
    "willpowerScore": 100,
    "createdAt": "2026-02-26T04:01:55.655Z"
  }
}
```

### Status
| status | response content |
| :--- | :--- |
| 200 | 인증 성공 및 사용자 데이터 반환 |
| 401 | 유효하지 않은 토큰 또는 토큰 누락 (Unauthorized) |