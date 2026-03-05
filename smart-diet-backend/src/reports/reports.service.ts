import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 전역 프리즈마 서비스 사용
import { WeeklyReportResponseDto, DailyNutritionDto } from './dto/weekly-report-response.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWeeklyReport(userId: string): Promise<WeeklyReportResponseDto> {
    // 1. 유저의 목표 칼로리 가져오기 (기본값 2000kcal)
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { targetCalories: true }
    });
    const targetCalories = user?.targetCalories || 2000;

    // 1. 기간 설정 (오늘부터 7일 전까지)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0); // 시작일의 00시 00분부터 집계

    // 2. 해당 기간의 식단 데이터 조회 (Ownership 검증 포함)
    const meals = await this.prisma.meal.findMany({
      where: {
        userId, // 본인 데이터만 집계
        mealDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { mealDate: 'asc' },
    });

    // 3. 일자별 상세 내역 가공
    const dailyMap = new Map<string, DailyNutritionDto>();

    // 7일간의 날짜 키 미리 생성 (데이터가 없는 날도 0으로 표시하기 위함)
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      dailyMap.set(dateStr, {
        date: dateStr,
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
      });
    }

    // 실제 데이터를 날짜별로 합산
    meals.forEach((meal) => {
      const dateStr = meal.mealDate.toISOString().split('T')[0];
      const daily = dailyMap.get(dateStr);
      if (daily) {
        daily.totalCalories += meal.calories;
        daily.totalCarbs += meal.carbs || 0;
        daily.totalProtein += meal.protein || 0;
        daily.totalFat += meal.fat || 0;

        // 달성률 및 상태 업데이트
      daily.targetCalories = targetCalories;
      daily.achievementRate = Math.round((daily.totalCalories / targetCalories) * 100);
      // 목표의 90%~110% 사이면 달성으로 간주하는 등의 로직 가능
      daily.isGoalAchieved = daily.totalCalories >= targetCalories * 0.9 && daily.totalCalories <= targetCalories * 1.1;
      }
    });

    const dailyDetails = Array.from(dailyMap.values());

    // 4. 주간 합계 계산
    const weeklyTotals = dailyDetails.reduce(
      (acc, day) => {
        acc.calories += day.totalCalories;
        acc.carbs += day.totalCarbs;
        acc.protein += day.totalProtein;
        acc.fat += day.totalFat;
        return acc;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );

    // 5. 일일 평균 계산
    const dailyAverages = {
      calories: Math.round(weeklyTotals.calories / 7),
      carbs: Math.round(weeklyTotals.carbs / 7),
      protein: Math.round(weeklyTotals.protein / 7),
      fat: Math.round(weeklyTotals.fat / 7),
    };

    // 6. DTO 반환
    return new WeeklyReportResponseDto({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      weeklyTotals,
      dailyAverages,
      dailyDetails,
    });
  }
}