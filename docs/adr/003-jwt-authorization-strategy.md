# ADR-003: JWT 기반 인가(Authorization) 시스템 구현 및 타입 안정성 확보

| 항목 | 내용 |
| :--- | :--- |
| **날짜** | 2026-03-02 |
| **상태** | 승인됨 (Accepted) |
| **작성자** | J |
| **영향 범위** | AuthModule / Passport Strategy / Global Guards |

---

## 🎬 컨텍스트 (Context)
로그인 성공 시 발급된 JWT를 통해 사용자의 신원을 지속적으로 확인하고, 보호된 리소스(API)에 대한 접근 권한을 관리해야 합니다. 구현 과정에서 환경 변수(`.env`) 로드 시 발생하는 TypeScript의 타입 불일치 문제와 런타임 안정성을 동시에 해결해야 하는 과제가 있었습니다.

## 🎀 결정 (Decision)

### 1. JwtModule의 비동기 등록 (registerAsync) 채택
- **결정**: `ConfigService`를 주입받아 환경 변수가 로드된 후 모듈을 초기화하는 `registerAsync` 방식을 채택했습니다.
- **이유**: 서비스 초기화 시점에 `JWT_SECRET`과 `EXPIRES_IN` 값을 안전하게 주입받기 위함입니다.

### 2. Passport-JWT 기반의 JwtStrategy 구현
- **결정**: `PassportStrategy`를 상속받은 전용 전략 클래스를 생성했습니다.
- **주요 로직**:
    - **토큰 추출**: 헤더의 `Authorization: Bearer <token>` 형식을 사용합니다.
    - **사용자 검증**: 토큰 페이로드의 `sub(userId)`를 이용해 DB 내 사용자의 실존 여부를 매번 확인하여 보안성을 높였습니다.
    - **Request 객체 확장**: 검증된 유저 정보를 `req.user`에 자동으로 주입하도록 설정했습니다.

### 3. TypeScript 타입 안정성 강화 (Troubleshooting 반영)
- **결정**: `ConfigService.get()` 대신 **`getOrThrow()`** 메서드를 사용하고 명시적 타입 캐스팅을 적용했습니다.
- **이유**: 
    - `get()`은 반환 타입이 `string | undefined`로 추론되어 `JwtModule`의 엄격한 타입 요구사항과 충돌합니다.
    - `getOrThrow()`를 통해 환경 변수 누락 시 서버 실행 단계에서 즉시 에러를 발생시켜 가용성을 보장합니다.
    - 라이브러리 간 인터페이스 차이로 발생하는 `expiresIn` 타입 에러는 `as any`로 명시적 처리했습니다.

### 4. 전용 JwtAuthGuard 생성
- **결정**: `AuthGuard('jwt')`를 상속받은 커스텀 가드를 생성하여 가독성을 높였습니다.
- **활용**: `@UseGuards(JwtAuthGuard)` 데코레이터를 통해 컨트롤러 및 메서드 단위의 보안을 선언적으로 적용합니다.

---

## 📸 결과 (Consequences)

### 긍정적 영향
- **보안 강화**: 모든 요청에 대해 토큰 유효성 및 DB 사용자 존재 여부를 이중으로 체크합니다.
- **타입 안정성**: TypeScript 컴파일 에러를 해결하고, 런타임 시 환경 변수 누락으로 인한 예기치 못한 크래시를 방지합니다.
- **문서화 용이**: Swagger의 `@ApiBearerAuth()`와 연동하여 테스트 환경을 일원화했습니다.

### 부정적 영향 / 주의사항
- **DB 부하**: 매 요청마다 `validate` 메서드에서 DB 조회가 발생하므로, 향후 트래픽 증가 시 Redis 등을 활용한 캐싱 도입을 고려해야 합니다.

---

## 🔗 참고 자료
- [NestJS Authentication Official Docs](https://docs.nestjs.com/security/authentication)
- [Passport.js JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)