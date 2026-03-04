// src/meal/meal.module.ts
import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';

@Module({
  controllers: [MealController], // 컨트롤러 등록
  providers: [MealService],
})
export class MealModule {}