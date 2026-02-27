// src/users/dto/signup.dto.ts
import { ApiProperty } from '@nestjs/swagger'; // Swagger용 데코레이터
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ 
    example: 'rose@test.com', 
    description: '사용자 가입 이메일임.' 
  }) // Swagger 화면에 예시와 설명을 보여줌.
  // @(골뱅이)로 시작하는 것은 '데코레이터'라고 하며, 스프링의 어노테이션(@)과 비슷
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' }) // 이메일 형식인지 검사
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' }) // 빈 값인지 검사
  email: string; // 변수명 뒤에 ': string'을 붙여 문자열 타입임을 명시

  @ApiProperty({ 
    example: 'password1234', 
    description: '비밀번호는 최소 8자 이상이어야 함.' 
  })
  @IsString() // 문자열인지 검사
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }) // 최소 길이 검사
  password: string;

  @ApiProperty({ 
    example: '로즈', 
    description: '서비스에서 사용할 닉네임임.' 
  })
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  nickname: string;
}