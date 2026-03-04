import { ApiProperty } from '@nestjs/swagger';
import { MealType } from '@prisma/client';

export class MealResponseDto {
  @ApiProperty({ description: '식단 고유 ID', example: 'uuid-1234' })
  id: string;

  @ApiProperty({ description: '음식 이름', example: '닭가슴살 샐러드' })
  title: string;

  @ApiProperty({ description: '식사 유형', enum: MealType })
  mealType: MealType;

  @ApiProperty({ description: '칼로리', example: 350 })
  calories: number;

  @ApiProperty({ description: '식사 일시', example: '2026-03-02T16:00:00Z' })
  mealDate: Date;

  // 생성자를 통해 Prisma 객체를 DTO로 변환하는 헬퍼 로직
  constructor(meal: any) {
    this.id = meal.id;
    this.title = meal.title;
    this.mealType = meal.mealType;
    this.calories = meal.calories;
    this.mealDate = meal.mealDate;
    // userId나 password 같은 민감 정보는 여기서 제외합니다.
  }
}