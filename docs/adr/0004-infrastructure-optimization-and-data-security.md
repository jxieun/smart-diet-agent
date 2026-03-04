# 004: Prisma 7 기반 인프라 최적화 및 사용자 데이터 보안 강화

| 항목 | 내용 |
| :--- | :--- |
| **날짜** | 2026-03-04 |
| **상태** | 승인됨 (Accepted) |
| **작성자** | J |
| **영향 범위** | Prisma Infra / MealModule / Security / DTO |

---

## 🎬 컨텍스트 (Context)
프로젝트가 성장함에 따라 데이터베이스 관리의 복잡도가 증가하고 있으며, **Prisma 7**의 최신 기능을 도입하여 스키마 관리의 효율성을 높여야 하는 시점입니다. 또한, 사용자의 식단 기록은 민감한 개인 정보이므로 **철저한 데이터 격리(Isolation)**와 API 응답 시 **비밀번호 해시 등 민감 정보의 노출 차단**이 필수적인 과제로 대두되었습니다.

---

## 🎀 결정 (Decision)

### 1. Prisma 7 최신 설정 및 스키마 폴더 분할 적용
- **결정**: `prisma.config.ts`와 `defineConfig`를 통한 중앙 집중식 설정을 도입하고, `prismaSchemaFolder` 기능을 활성화했습니다.
- **이유**: 도메인별(User, Meal 등)로 스키마 파일을 분리하여 유지보수성을 높이고, 환경 변수 기반의 DB 연결 설정을 더욱 안정적으로 관리하기 위함입니다.

### 2. 전역 싱글톤 PrismaModule 구축
- **결정**: `PrismaService`를 포함하는 `PrismaModule`을 **`@Global()`** 모듈로 선언하고 애플리케이션 최상위(`AppModule`)에서 한 번만 로드하도록 설계했습니다.
- **이유**: 각 모듈마다 별도의 DB 연결 인스턴스가 생성되는 것을 방지하여, 데이터베이스 커넥션 풀(Connection Pool)의 효율성을 극대화하고 자원 낭비를 줄이기 위함입니다.

### 3. 소유권 기반의 데이터 접근 검증 (Ownership Validation)
- **결정**: `MealService`의 모든 CRUD 로직에서 식단 ID뿐만 아니라 **`userId`를 함께 검증**하는 방식을 채택했습니다.
- **주요 로직**: `findFirst({ where: { id, userId } })`를 사용하여, 요청자가 해당 데이터의 실제 소유자가 아닐 경우 접근을 원천 차단하고 `NotFoundException`을 던집니다.

### 4. Response DTO를 통한 데이터 정제 (Sanitization)
- **결정**: `UserResponseDto`와 `MealResponseDto`를 도입하여 클라이언트에 전달되는 데이터를 엄격히 제어했습니다.
- **이유**: DB 모델을 직접 반환할 경우 발생할 수 있는 **비밀번호 해시 노출**이나 불필요한 내부 식별자(Internal ID)의 유출을 방지하여 보안성을 강화하기 위함입니다.

---

## 📸 결과 (Consequences)

### 긍정적 영향
- **인프라 효율성**: 싱글톤 패턴을 통해 안정적인 DB 연결 상태를 유지하며 서버 자원을 최적화했습니다.
- **보안성 극대화**: 식단 데이터의 소유권 검증과 응답 데이터 필터링을 통해 개인 정보 보호 수준을 크게 높였습니다.
- **개발 생산성**: Swagger 문서에 명확한 응답 타입과 설명이 반영되어 프론트엔드 협업 및 테스트가 용이해졌습니다.

### 부정적 영향 / 주의사항
- **DTO 관리 비용**: 새로운 모델이 추가될 때마다 요청(Request) 및 응답(Response) DTO를 각각 생성해야 하므로 초기 개발 공수가 다소 증가할 수 있습니다.

---

## 🔗 참고 자료
- [Prisma 7 Release Notes & Configuration Guide](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
- [NestJS Circular Dependency & Global Modules](https://docs.nestjs.com/modules#global-modules)