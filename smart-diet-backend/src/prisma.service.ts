// src/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // 모듈이 초기화될 때 DB에 연결합니다.
  async onModuleInit() {
    await this.$connect();
  }
}