// prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // .env 파일을 읽어옴

export default defineConfig({
  datasource: {
    // env("DATABASE_URL") 대신 process.env를 사용
    url: process.env.DATABASE_URL,
  },
});