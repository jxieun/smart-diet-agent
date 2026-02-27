// src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // 공통 주소는 'auth'임.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // 'POST /auth/login' 주소로 요청을 받음.
  @HttpCode(HttpStatus.OK) // 로그인 성공 시 200 OK 상태코드를 보냄.
  async login(@Body() loginDto: LoginDto) {
    // 서비스의 로그인 메서드를 실행해서 결과를 리턴함.
    return this.authService.login(loginDto);
  }
}
