import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MealType } from '@prisma/client';

export class CreateMealDto {
  @ApiProperty({ description: '음식 이름 또는 식사 메뉴', example: '닭가슴살 샐러드' })
  @IsString()
  @IsNotEmpty({ message: '음식 이름을 입력해주세요.' })
  title: string;

  @ApiProperty({ 
    description: '식사 유형', 
    enum: MealType, 
    example: MealType.LUNCH 
  })
  @IsEnum(MealType, { message: '올바른 식사 유형을 선택해주세요. (BREAKFAST, LUNCH, DINNER, SNACK)' })
  mealType: MealType;

  @ApiProperty({ description: '섭취 칼로리 (kcal)', example: 350 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: '칼로리를 입력해주세요.' })
  calories: number;

  @ApiPropertyOptional({ description: '탄수화물 함량 (g)', example: 10.5 })
  @IsNumber()
  @IsOptional()
  carbs?: number; // 탄수화물 (선택)

  @ApiPropertyOptional({ description: '단백질 함량 (g)', example: 30.2 })
  @IsNumber()
  @IsOptional()
  protein?: number; // 단백질 (선택)


  @ApiPropertyOptional({ description: '지방 함량 (g)', example: 5.8 })
  @IsNumber()
  @IsOptional()
  fat?: number; // 지방 (선택)
}
