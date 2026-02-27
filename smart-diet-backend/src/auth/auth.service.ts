// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService} from 'src/prisma.service'; // Prisma 연결용 서비스
import { LoginDto } from './dto/login.dto'; 
import * as bcrypt from 'bcrypt'; // 비밀번호 해싱 라이브러리 : 비밀번호 비교를 위해 가져옴

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {} // DB에 접급하기 위해 주입

    async login(loginDto: LoginDto) { 
        const { email, password } = loginDto; // 로그인 시 입력된 이메일과 비밀번호를 추출

        // 1. DB에서 해당 이메일을 가진 유저가 있는지 찾아봄.
        const user = await this.prisma.user.findUnique({
            where: { email }, 
        });

        // 2. 유저가 없으면 에러를 던짐. 보안을 위해 메시지는 공통으로 처리함.
        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 3. 입력받은 비밀번호와 DB의 암호화된 비밀번호를 비교함.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // 4. 비밀번호가 틀리면 역시 에러를 던짐.
        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        
        // 5. 로그인 성공 시, 유저 정보를 반환하거나 JWT 토큰을 생성하여 반환할 수 있음.
        const { password: _, ...result } = user; // 비밀번호는 반환하지 않도록 제외
        return result; // 로그인 성공 시 유저 정보를 반환
    }
}
