// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserPreferencesDto } from './dto/update-preferences.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    /**
     * 1. 회원가입 (Signup)
     * UsersService에서 이동해 온 로직
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
     * 기존 AuthService의 로그인 로직
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

    /**
     * 3. 프로필 및 목표 수정
     * 유저의 닉네임, 목표 칼로리 등을 부분 수정(Patch)
     */
    async updateUserPreferences(userId: string, dto: UpdateUserPreferencesDto) {
        // 1. 유저 존재 확인 (보안 및 정확성 위해)
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }

        // 2. 데이터 업데이트
        // DTO에 값이 들어온 필드만 골라서 업데이트를 수행
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.nickname && { nickname: dto.nickname }),
                ...(dto.goalCalories !== undefined && { goalCalories: dto.goalCalories }),
                ...(dto.activityLevel && { activityLevel: dto.activityLevel }),
            },
        });

        // 3. 보안을 위해 비밀번호 제외 후 반환
        const { password, ...result } = updatedUser;
        return result;
    }
}
