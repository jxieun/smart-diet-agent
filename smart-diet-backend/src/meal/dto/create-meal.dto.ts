import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MealType } from '@prisma/client';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty({ message: '음식 이름을 입력해주세요.' })
  title: string;

  @IsEnum(MealType, { message: '올바른 식사 유형을 선택해주세요. (BREAKFAST, LUNCH, DINNER, SNACK)' })
  mealType: MealType;

  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: '칼로리를 입력해주세요.' })
  calories: number;

  @IsNumber()
  @IsOptional()
  carbs?: number; // 탄수화물 (선택)

  @IsNumber()
  @IsOptional()
  protein?: number; // 단백질 (선택)

  @IsNumber()
  @IsOptional()
  fat?: number; // 지방 (선택)
}