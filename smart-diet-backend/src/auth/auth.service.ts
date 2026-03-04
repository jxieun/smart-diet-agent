// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // JWT 발급을 위해 추가
import { PrismaService} from 'src/prisma/prisma.service'; // Prisma 연결용 서비스
import { LoginDto } from './dto/login.dto'; 
import * as bcrypt from 'bcrypt'; // 비밀번호 해싱 라이브러리 : 비밀번호 비교를 위해 가져옴

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
                private jwtService: JwtService, // JwtModule에서 제공하는 JwtService 주입
    ) {} // DB에 접급하기 위해 주입

    async login(loginDto: LoginDto) { 
        const { email, password } = loginDto; // 로그인 시 입력된 이메일과 비밀번호를 추출

        // 1. DB에서 해당 이메일을 가진 유저가 있는지 찾아봄.
        const user = await this.prisma.user.findUnique({
            where: { email }, 
        });

        // 2. 유저가 없으면 에러를 던짐. 보안을 위해 메시지는 공통으로 처리함.
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 3. JWT에 담을 페이로드(Payload) 구성
        // sub(subject)는 보통 사용자의 고유 ID를 넣는 표준 필드입니다.
        const payload = { 
          email: user.email, 
          sub: user.id 
        };

        // 4. 토큰 생성 및 반환
        return {
          accessToken: this.jwtService.sign(payload),
        };
    }
}
