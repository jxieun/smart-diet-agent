// src/auth/strategies/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // 1. 헤더의 'Authorization: Bearer <token>'에서 토큰을 추출합니다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. 토큰 만료 시 요청을 거부합니다.
      ignoreExpiration: false,
      // getOrThrow를 써서 "무조건 값이 있다"는 것을 TypeScript에게 알려줌
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // 4. 토큰 검증이 성공하면 실행되는 메서드입니다.
  // payload에는 우리가 AuthService에서 담았던 { sub, email }이 들어있습니다.
  async validate(payload: any) {
    const { sub: id } = payload;

    // DB에서 실제 사용자가 존재하는지 한 번 더 확인합니다.
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    // 여기서 반환된 user 객체는 모든 Request 객체의 'user' 필드에 자동으로 주입됩니다.
    // (req.user로 접근 가능)
    return user;
  }
}