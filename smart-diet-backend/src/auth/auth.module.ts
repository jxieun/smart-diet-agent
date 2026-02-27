// src/auth/auth.module.ts
import { Module } from '@nestjs/common'; // NestJS의 핵심 기능인 Module을 가져옴.
import { AuthService } from './auth.service'; // 우리가 만든 서비스를 가져옴.
import { AuthController } from './auth.controller'; // 우리가 만든 컨트롤러를 가져옴.
import { PrismaService } from '../prisma.service'; // DB 연결을 위한 프리즈마 서비스를 가져옴.

@Module({
  imports: [],
  controllers: [AuthController], 
  providers: [AuthService, PrismaService], // AuthService와 PrismaService를 이 모듈의 '프로바이더'로 등록함. (의존성 주입을 위해)
})
export class AuthModule {}