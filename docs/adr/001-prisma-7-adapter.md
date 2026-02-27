# ADR-001: Prisma 7 드라이버 어댑터 패턴 채택

| 항목 | 내용 |
| :--- | :--- |
| **날짜** | 2026-02-26 |
| **상태** | 승인됨 (Accepted) |
| **작성자** | J |
| **영향 범위** | smart-diet-backend / 데이터베이스 연결 계층 |

---

## 🎬 컨텍스트 (Context)
`smart-diet-backend` 프로젝트는 **NestJS + Prisma + PostgreSQL** 스택으로 구성되어 있습니다. Prisma 7.4.1로 초기 세팅하는 과정에서 이전 버전(v5, v6) 방식의 DB 연결 설정이 동작하지 않는 문제가 발생했습니다.

Prisma 7의 주요 변경 사항(Breaking Changes)은 다음과 같습니다:
- `PrismaClient` 생성자에서 `datasources`, `datasourceUrl` 옵션 제거
- `schema.prisma`의 `datasource.url` 속성 제거
- DB 연결 URL 설정은 **`prisma.config.ts`**로 일원화
- 런타임 DB 연결은 **드라이버 어댑터**를 통해서만 가능

## 🎀 결정 (Decision)
Prisma 7의 드라이버 어댑터 패턴(`@prisma/adapter-pg`)을 채택하여 DB 연결 구조를 최신 규격에 맞게 재구성합니다.

### 🛠️ 구성 방식

#### 1. schema.prisma
모델 정의만 담당하며, URL 설정은 포함하지 않습니다.
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
}
```
#### 2. prisma.config.ts
CLI 도구(migrate, generate, studio)를 위한 설정을 담당합니다.

```TypeScript
import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

#### 3. prisma.service.ts
런타임 연결 시 어댑터를 통해 DB에 접속합니다.

```TypeScript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
```

### ⚠️ 패키지 설치 및 실행 주의사항
Prisma CLI 및 관련 패키지는 **반드시 `smart-diet-backend` 내부**에 설치해야 합니다. 프로젝트 루트(`Project_Diet_Agent`)의 `node_modules`에만 존재할 경우, `npx prisma generate`가 잘못된 컨텍스트에서 실행되어 `@prisma/client`를 찾지 못하는 문제가 발생합니다.

### 🛠️ 설치 및 실행 가이드

```Bash
# 1. backend 디렉토리 내부에서 설치
npm install prisma --save-dev
npm install @prisma/adapter-pg pg
npm install -D @types/pg


# 2. 로컬 경로를 직접 지정해 초기 실행
./node_modules/.bin/prisma generate
```
참고: 초기 생성 이후부터는 npx prisma generate 명령어로도 정상 동작합니다 (npx가 로컬 node_modules/.bin을 우선 탐색하기 때문).

---

### 🍒 검토한 대안들 (Alternatives Considered)

#### 대안 1: Prisma 버전 다운그레이드 (v5 또는 v6)
- **장점**: 기존의 익숙한 설정 방식(datasources, `url = env(...)`) 그대로 유지 가능.
- **결론**: **기각**. 신규 프로젝트에서 보안 패치 및 최신 기능을 포기하고 기술 부채를 남길 이유가 없음.

#### 대안 2: Prisma 대신 TypeORM 또는 Drizzle 사용
- **단점**: 이미 작성된 Prisma 스키마 및 마이그레이션 파일의 전환 비용이 매우 큼.
- **결론**: **기각**. 현 시점에서 ORM 교체 비용이 전환으로 얻는 실익보다 크다고 판단됨.

---

### 📸 결과 (Consequences)

#### 긍정적 영향
- **유지보수성**: Prisma 최신 버전을 사용함으로써 장기적인 보안 패치 및 커뮤니티 지원 확보.
- **명확한 역할 분리**: `prisma.config.ts`(CLI용)와 `Adapter`(런타임용)의 분리로 환경별 설정 관리가 명확해짐.
- **유연한 확장성**: 드라이버 어댑터 패턴을 통해 향후 Edge Runtime이나 Serverless 환경으로의 이전이 용이함.

#### 부정적 영향 / 주의사항
- **빌드 경고**: `previewFeatures = ["driverAdapters"]` 설정으로 인한 경고 메시지가 출력됨.
- **의존성 증가**: `@prisma/adapter-pg` 및 `pg` 라이브러리에 대한 추가적인 의존성 관리가 필요함.
- **문서 혼선**: Prisma 공식 문서가 버전별로 혼재되어 있어 검색 시 구버전 가이드를 참조하지 않도록 팀 내 가이드 필요.

---

### 🔗 참고 자료
- [Prisma 7 Client Config 공식 문서](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections)
- [Prisma Driver Adapters 가이드](https://www.prisma.io/docs/orm/prisma-client/deployment/driver-adapters)
- [Prisma Config Datasource 가이드](https://www.prisma.io/docs/orm/reference/prisma-config-reference#datasource)

---

### 📖 Prisma Config Datasource 설정 가이드

Prisma 7부터는 `schema.prisma` 대신 `prisma.config.ts`에서 데이터소스를 관리합니다. 주요 설정 규칙은 다음과 같습니다.

* **환경 변수 로드**: `dotenv/config`를 사용하여 `.env` 파일의 `DATABASE_URL`을 안전하게 불러옵니다.
* **CLI 도구 연동**: `npx prisma migrate`나 `npx prisma studio` 실행 시 이 파일에 정의된 `url`을 참조합니다.
* **코드 예시**:
    ```typescript
    import { defineConfig } from '@prisma/config';
    import 'dotenv/config';

    export default defineConfig({
      datasource: {
        url: process.env.DATABASE_URL, // CLI 작업용 URL
      },
    });
    ```