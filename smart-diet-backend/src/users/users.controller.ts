// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth') // 이 컨트롤러의 기본 주소는 'http://localhost:3000/auth'
export class UsersController {
  // 서비스 클래스를 연결
  constructor(private readonly usersService: UsersService) {}

  @Post('signup') // POST 방식으로 '/auth/signup' 요청이 오면 실행됨.
  // @Body(): 클라이언트가 보낸 본문(Body) 데이터를 SignupDto 형태로 받겠다는 뜻
  async signup(@Body() dto: SignupDto) {
    // 받은 데이터를 서비스의 signup 함수로 넘겨줌.
    return this.usersService.signup(dto);
  }
}