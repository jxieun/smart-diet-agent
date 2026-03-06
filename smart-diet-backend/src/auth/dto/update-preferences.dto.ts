import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateUserPreferencesDto {
  @ApiPropertyOptional({ example: '마멜', description: '변경할 닉네임' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ example: 1800, description: '목표 칼로리' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  goalCalories?: number; // Prisma 스키마 필드명에 맞춤

  @ApiPropertyOptional({ example: 'ACTIVE', description: '활동 수준' })
  @IsString()
  @IsOptional()
  activityLevel?: string;
}