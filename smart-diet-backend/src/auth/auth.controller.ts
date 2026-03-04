// src/auth/auth.controller.ts
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // 데코레이터
import { Body, Controller, Post, UseGuards, Request, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('auth') // 이 컨트롤러의 모든 API를 'auth' 그룹으로 묶음.
@Controller('auth') // 공통 주소는 'auth'임.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // 'POST /auth/login' 주소로 요청을 받음.
  @ApiOperation({ summary: '로그인 API', description: '이메일과 비밀번호로 로그인을 시도함.' }) // 제목과 설명
  @ApiResponse({ 
    status: 200, 
    description: '로그인 성공 및 JWT 토큰 발급',
    schema: {
      example: { accessToken: 'eyJhbGciOiJIUzI1Ni...' }
    }
  }) // 성공 시 
  @ApiResponse({ status: 401, description: '인증 실패' }) // 실패 시 
  @HttpCode(HttpStatus.OK) // 로그인 성공 시 200 OK 상태코드를 보냄.
  async login(@Body() loginDto: LoginDto) {
    // 서비스의 로그인 메서드를 실행해서 결과를 리턴함.
    // AuthService의 login 메서드를 호출하여 { accessToken: '...' }를 반환받음
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth() // 🔒 Swagger UI에 자물쇠 아이콘을 표시하고 토큰이 필요함을 알림
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: '내 정보 조회 API', 
    description: 'JWT 토큰을 이용하여 현재 로그인한 사용자의 정보를 가져옵니다.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '조회 성공',
    type: UserResponseDto
  })
  @ApiResponse({ status: 401, description: '토큰이 없거나 유효하지 않음' })
  getProfile(@Request() req) {
    return {
      message: '내 정보 조회 성공',
      user: new UserResponseDto(req.user),
    };
  }
}
