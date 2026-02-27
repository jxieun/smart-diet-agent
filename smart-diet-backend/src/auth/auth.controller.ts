// src/auth/auth.controller.ts
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // 데코레이터
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth') // 이 컨트롤러의 모든 API를 'auth' 그룹으로 묶음.
@Controller('auth') // 공통 주소는 'auth'임.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // 'POST /auth/login' 주소로 요청을 받음.
  @ApiOperation({ summary: '로그인 API', description: '이메일과 비밀번호로 로그인을 시도함.' }) // 제목과 설명
  @ApiResponse({ status: 200, description: '로그인 성공' }) // 성공 시 
  @ApiResponse({ status: 401, description: '인증 실패' }) // 실패 시 
  @HttpCode(HttpStatus.OK) // 로그인 성공 시 200 OK 상태코드를 보냄.
  async login(@Body() loginDto: LoginDto) {
    // 서비스의 로그인 메서드를 실행해서 결과를 리턴함.
    return this.authService.login(loginDto);
  }
}
