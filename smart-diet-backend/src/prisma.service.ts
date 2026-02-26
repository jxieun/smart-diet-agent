// src/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 'as any'를 붙여서 타입스크립트의 엄격한 체크를 잠시 우회합니다.
    // Prisma 7 실행 시에는 이 값이 정상적으로 전달됩니다.
    super({
      datasourceUrl: process.env.DATABASE_URL,
    } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }
}