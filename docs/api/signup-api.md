# 📝 회원가입 API (Sign-up API)

새로운 사용자 계정을 생성하고 정보를 저장합니다.

## 🔗 Endpoint 정보
- **URL**: `/api/v1/auth/signup`
- **Method**: `POST`
- **인증 필요 여부**: No (Public)

---

## 📥 Request Body
| 필드명 | 타입 | 설명 | 필수 | 제약 조건 |
| :--- | :--- | :--- | :--- | :--- |
| `email` | String | 사용자 아이디(이메일) | 필수 | Email 형식 |
| `password` | String | 사용자 비밀번호 | 필수 | 최소 8자 이상 |
| `nickname` | String | 서비스 활동명 | 필수 | 2자 ~ 10자 |

### 💡 요청 예시
```json
{
  "email": "rose@example.com",
  "password": "password123!",
  "nickname": "로즈"
}
```

### 📤 Response

#### ✅ 성공: 201 Created
비밀번호는 `bcrypt`로 암호화되어 안전하게 저장됩니다.

```json
{
  "status": "success",
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "userId": "uuid-1234-5678",
    "email": "rose@example.com",
    "nickname": "로즈",
    "createdAt": "2026-02-27T10:00:00Z"
  }
}
```

#### ❌ 실패: 400 Bad Request
이미 가입된 이메일이거나 입력 형식이 잘못된 경우입니다.

```JSON
{
  "status": "error",
  "errorCode": "USER_001",
  "message": "이미 사용 중인 이메일입니다."
}
```