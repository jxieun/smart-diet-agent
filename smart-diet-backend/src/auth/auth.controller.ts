// src/auth/auth.controller.ts
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // 데코레이터
import { Body, Controller, Post, UseGuards, Request, HttpCode, HttpStatus, Get, Patch } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserPreferencesDto } from './dto/update-preferences.dto';

@ApiTags('auth') // 이 컨트롤러의 모든 API를 'auth' 그룹으로 묶음.
@Controller('auth') // 공통 주소는 'auth'임.
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. 회원가입 API
  @Post('signup') // POST 방식으로 '/auth/signup' 요청이 오면 실행됨.
  @ApiOperation({ 
    summary: '회원가입 API', 
    description: '새로운 사용자를 생성하고 정보를 저장함.' 
  }) // API의 목적을 적어줌.
  @ApiResponse({ 
    status: 201, 
    description: '회원가입 성공함.' 
  }) // 성공했을 때의 응답 설명임.
  @ApiResponse({ 
    status: 400, 
    description: '잘못된 입력값(이메일 형식 등)임.' 
  }) // 입력값 유효성 검사 실패 시 설명임.
  @ApiResponse({ 
    status: 409, 
    description: '이미 가입된 이메일임.' 
  }) // 중복 이메일 에러 설명임.
  // @Body(): 클라이언트가 보낸 본문(Body) 데이터를 SignupDto 형태로 받겠다는 뜻
  async signup(@Body() dto: SignupDto) {
    // 받은 데이터를 서비스의 signup 함수로 넘겨줌.
    return this.authService.signup(dto);
  }
  // 2. 로그인 API
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

  // 3. 내 정보 조회 API
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

  // ✨ 4. 사용자 목표 및 프로필 수정 API
  @UseGuards(JwtAuthGuard)
  @Patch('preferences') // PATCH /auth/preferences
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: '사용자 목표 및 프로필 수정 API', 
    description: '닉네임이나 목표 칼로리를 선택적으로 변경합니다.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '수정 성공',
    type: UserResponseDto 
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async updatePreferences(
    @Request() req, 
    @Body() updateDto: UpdateUserPreferencesDto
  ) {
    // req.user.id를 넘겨 본인의 정보만 수정하도록 함
    const updatedUser = await this.authService.updateUserPreferences(req.user.id, updateDto);
    return {
      message: '사용자 정보 수정 성공',
      user: new UserResponseDto(updatedUser), // 반환 시에도 민감 정보 정제
    };
  }
}
