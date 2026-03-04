import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // 프로젝트 경로에 맞춰 수정
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. 식단 기록 생성
  async create(userId: string, createMealDto: CreateMealDto) {
    return this.prisma.meal.create({
      data: {
        ...createMealDto,
        userId, // JWT에서 추출한 유저 ID를 연결
      },
    });
  }

  // 2. 내 식단 전체 조회
  async findAll(userId: string) {
    return this.prisma.meal.findMany({
      where: { userId }, // 내 데이터만 조회
      orderBy: { mealDate: 'desc' }, // 최신순 정렬
    });
  }

  // 3. 식단 상세 조회 (소유권 검증 포함)
  async findOne(id: string, userId: string) {
    const meal = await this.prisma.meal.findFirst({
      where: { id, userId }, // ID와 유저 ID가 모두 일치해야 함
    });

    if (!meal) {
      throw new NotFoundException('해당 식단 기록을 찾을 수 없거나 접근 권한이 없습니다.');
    }
    return meal;
  }

  // 4. 식단 수정 (소유권 검증 포함)
  async update(id: string, userId: string, updateMealDto: UpdateMealDto) {
    // 먼저 내 데이터가 맞는지 확인
    await this.findOne(id, userId);

    return this.prisma.meal.update({
      where: { id },
      data: updateMealDto,
    });
  }

  // 5. 식단 삭제 (소유권 검증 포함)
  async remove(id: string, userId: string) {
    // 먼저 내 데이터가 맞는지 확인
    await this.findOne(id, userId);

    return this.prisma.meal.delete({
      where: { id },
    });
  }
}