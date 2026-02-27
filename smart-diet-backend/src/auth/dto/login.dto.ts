// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger'; // Swagger용 데코레이터
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'rose@test.com', description: '유저 이메일' }) // Swagger에 예시를 보여줌.
  @IsEmail({}, { message: '올바른 이메일 형식이 아님.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목임.' })
  email!: string; // 유저가 입력한 이메일을 담는 변수

  @ApiProperty({ example: 'password1234', description: '유저 비밀번호' })
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목임.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 함.' })
  password!: string; // 유저가 입력한 비밀번호를 담는 변수
}