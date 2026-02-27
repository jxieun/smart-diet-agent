# 🔑 로그인 API (Login API)

사용자가 입력한 정보와 DB의 해시 비밀번호를 대조하여 인증을 수행합니다.

## 🔗 Endpoint 정보
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **인증 필요 여부**: No (Public)

---

## 📥 Request Body
| 필드명 | 타입 | 설명 | 필수 | 제약 조건 |
| :--- | :--- | :--- | :--- | :--- |
| `email` | String | 사용자 이메일 계정 | 필수 | - |
| `password` | String | 사용자 비밀번호 | 필수 | - |

### 💡 요청 예시
```json
{
  "email": "rose@example.com",
  "password": "password123!"
}
```

## 📤 Response

### ✅ 성공: 200 OK
인증에 성공하면 성공 메시지를 반환합니다. *(F-03에서 JWT 반환 로직 추가 예정)*

```json
{
  "status": "success",
  "message": "로그인에 성공했습니다.",
  "data": {
    "email": "rose@example.com",
    "nickname": "로즈"
  }
}
```

### ❌ 실패: 401 Unauthorized
이메일이 존재하지 않거나 비밀번호(bcrypt.compare)가 일치하지 않는 경우입니다.

```JSON
{
  "status": "error",
  "errorCode": "AUTH_001",
  "message": "이메일 또는 비밀번호가 일치하지 않습니다."
}
```

### ❌ 실패: 400 Bad Request
class-validator에 의해 요청 형식이 잘못되었을 때 발생합니다.

```JSON
{
  "status": "error",
  "errorCode": "COMMON_001",
  "message": "잘못된 입력값입니다."
}
```