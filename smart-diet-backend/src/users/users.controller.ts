// src/users/users.controller.ts
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';

@ApiTags('auth') // 이 컨트롤러의 API들을 'auth' 그룹으로 묶음.
@Controller('auth') // 이 컨트롤러의 기본 주소는 'http://localhost:3000/auth'
export class UsersController {
  // 서비스 클래스를 연결
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.signup(dto);
  }
}