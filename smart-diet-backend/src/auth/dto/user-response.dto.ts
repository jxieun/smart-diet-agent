import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '유저 고유 ID', example: 'uuid-1234' })
  id: string;

  @ApiProperty({ description: '이메일', example: 'rose@test.com' })
  email: string;

  @ApiProperty({ description: '닉네임', example: '로즈' })
  nickname: string;

  @ApiProperty({ example: 2000, description: '일일 목표 칼로리' })
  goalCalories: number;

  @ApiProperty({ description: '가입일', example: '2026-03-02T...' })
  createdAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.goalCalories = user.goalCalories;
    this.createdAt = user.createdAt;
    // 여기서 password는 절대 담지 않음
  }
}