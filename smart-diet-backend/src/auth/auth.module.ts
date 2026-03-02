// src/auth/auth.module.ts
import { Module } from '@nestjs/common'; // NestJS의 핵심 기능인 Module을 가져옴.
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 환경 변수 사용을 위해 추가
import { AuthService } from './auth.service'; // 우리가 만든 서비스를 가져옴.
import { AuthController } from './auth.controller'; // 우리가 만든 컨트롤러를 가져옴.
import { PrismaService } from '../prisma.service'; // DB 연결을 위한 프리즈마 서비스를 가져옴.

@Module({
  imports: [
    // 1. JWT 모듈을 비동기 방식으로 등록합니다. (ConfigService가 로드된 후 실행됨)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // .env에 저장한 시크릿 키를 가져옵니다.
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { 
          // .env에 저장한 만료 시간(예: 3600s)을 설정합니다.
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') 
        },
      }),
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, PrismaService], // AuthService와 PrismaService를 이 모듈의 '프로바이더'로 등록함. (의존성 주입을 위해)
})
export class AuthModule {}