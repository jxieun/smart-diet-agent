// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'; // 비밀번호 암호화를 위한 라이브러리

@Injectable() // 이 클래스가 NestJS의 '서비스'임을 나타냄
export class UsersService {
  // 생성자를 통해 PrismaService를 주입받음. (= Spring의 의존성 주입)
  constructor(private prisma: PrismaService) {}

  // async: 비동기 처리, DB 작업은 시간이 걸리므로 반드시 써주기
  async signup(dto: SignupDto) {
    // 1. 이메일 중복 확인 (Prisma를 이용해 DB를 조회)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 만약 이미 사용자가 있다면 예외(Error)를 던짐
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    // 2. 비밀번호 암호화
    // 해싱 작업을 거쳐 원래 비밀번호를 알아볼 수 없게 만듦. 숫자 10은 암호화 강도
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. DB에 유저 생성
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword, // 암호화된 비밀번호를 저장
        nickname: dto.nickname,
      },
    });

    // 4. 보안을 위해 결과에서 비밀번호 필드만 쏙 빼고 반환
    const { password, ...result } = user;
    return result;
  }
}