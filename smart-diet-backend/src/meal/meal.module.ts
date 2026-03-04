// src/meal/meal.module.ts
import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MealController], // 컨트롤러 등록
  providers: [MealService, PrismaService],
})
export class MealModule {}