// src/auth/auth.module.ts
import { Module } from '@nestjs/common'; // NestJS의 핵심 기능인 Module을 가져옴.
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 환경 변수 사용을 위해 추가
import { AuthService } from './auth.service'; // 우리가 만든 서비스를 가져옴.
import { AuthController } from './auth.controller'; // 우리가 만든 컨트롤러를 가져옴.
import { PrismaService } from '../prisma.service'; // DB 연결을 위한 프리즈마 서비스를 가져옴.
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // 1. JWT 모듈을 비동기 방식으로 등록 (ConfigService가 로드된 후 실행됨)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // getOrThrow를 사용하면 값이 없을 때 에러를 던져주므로 
        // TypeScript가 'undefined'일 걱정을 하지 않아도 됨
        secret: configService.getOrThrow<string>('JWT_SECRET'), 
        signOptions: { 
          // 타입을 명시적으로 'any'로 지정하거나, string임을 확실히 해줌
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, PrismaService, JwtStrategy], // AuthService와 PrismaService, JwtStrategy를 이 모듈의 '프로바이더'로 등록 (의존성 주입을 위해)
})
export class AuthModule {}