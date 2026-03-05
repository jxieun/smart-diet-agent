import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 전역 프리즈마 서비스 사용
import { WeeklyReportResponseDto, DailyNutritionDto } from './dto/weekly-report-response.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 최근 7일간의 주간 영양 리포트를 생성합니다.
   */
  async getWeeklyReport(userId: string): Promise<WeeklyReportResponseDto> {
    // 1. 유저의 목표 칼로리 정보 가져오기 (기본값 2000kcal)
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { goalCalories: true },
    });
    const targetCalories = user?.goalCalories || 2000;

    // 2. 기간 설정 (오늘 자정부터 6일 전 00시까지 총 7일)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0); // 시작일 기준 시간을 00:00:00으로 고정

    // 3. 7일치 빈 데이터 Map 초기화 (식단 기록이 없는 날 대응)
    const dailyMap = new Map<string, DailyNutritionDto>();
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(startDate);
      tempDate.setDate(startDate.getDate() + i);
      const dateStr = tempDate.toISOString().split('T')[0];

      dailyMap.set(dateStr, {
        date: dateStr,
        totalCalories: 0,
        targetCalories: targetCalories,
        achievementRate: 0,
        isGoalAchieved: false,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
      });
    }

    // 4. 해당 기간의 식단 데이터 조회 (본인 데이터만 집계)
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
        mealDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // 5. 조회된 식단 데이터를 날짜별로 합산
    meals.forEach((meal) => {
      const dateStr = meal.mealDate.toISOString().split('T')[0];
      const daily = dailyMap.get(dateStr);
      if (daily) {
        daily.totalCalories += meal.calories;
        daily.totalCarbs += meal.carbs || 0;
        daily.totalProtein += meal.protein || 0;
        daily.totalFat += meal.fat || 0;
      }
    });

    // 6. 모든 날짜에 대해 목표 달성률 및 상태 최종 계산
    dailyMap.forEach((daily) => {
      daily.achievementRate = Math.round((daily.totalCalories / targetCalories) * 100);
      // 목표 칼로리의 90% ~ 110% 사이일 때 성공으로 간주
      daily.isGoalAchieved =
        daily.totalCalories >= targetCalories * 0.9 &&
        daily.totalCalories <= targetCalories * 1.1;
    });

    const dailyDetails = Array.from(dailyMap.values());

    // 7. 주간 합계 및 평균 계산
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

    const dailyAverages = {
      calories: Math.round(weeklyTotals.calories / 7),
      carbs: Math.round(weeklyTotals.carbs / 7),
      protein: Math.round(weeklyTotals.protein / 7),
      fat: Math.round(weeklyTotals.fat / 7),
    };

    // 8. DTO 형태로 최종 반환
    return new WeeklyReportResponseDto({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      weeklyTotals,
      dailyAverages,
      dailyDetails,
    });
  }
}