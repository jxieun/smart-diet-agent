// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { LoginDto } from './dto/login.dto'; 
import { SignupDto } from './dto/signup.dto'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    /**
     * 1. 회원가입 (Signup)
     * UsersService에서 이동해 온 로직입니다.
     */
    async signup(dto: SignupDto) {
        // 이메일 중복 확인
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('이미 가입된 이메일입니다.');
        }

        // 비밀번호 암호화 (강도 10)
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // DB 유저 생성
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                nickname: dto.nickname,
            },
        });

        // 보안을 위해 비밀번호 제외 후 반환
        const { password, ...result } = user;
        return result;
    }

    /**
     * 2. 로그인 (Login)
     * 기존 AuthService의 로그인 로직입니다.
     */
    async login(loginDto: LoginDto) { 
        const { email, password } = loginDto;

        // 유저 존재 여부 확인
        const user = await this.prisma.user.findUnique({
            where: { email }, 
        });

        // 비밀번호 비교 및 검증
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // JWT 페이로드 구성
        const payload = { 
          email: user.email, 
          sub: user.id 
        };

        // 토큰 반환
        return {
          accessToken: this.jwtService.sign(payload),
        };
    }
}
