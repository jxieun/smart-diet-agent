import { ApiProperty } from '@nestjs/swagger';

/**
 * 일자별 영양 섭취 정보
 */
export class DailyNutritionDto {
  @ApiProperty({ example: '2026-03-04', description: '날짜' })
  date: string;

  @ApiProperty({ example: 2100, description: '일일 총 칼로리' })
  totalCalories: number;

  @ApiProperty({ example: 2000, description: '목표 칼로리' })
  targetCalories: number; // 에러 해결: 필드 추가

  @ApiProperty({ example: 95, description: '달성률 (%)' })
  achievementRate: number; // 에러 해결: 필드 추가

  @ApiProperty({ example: true, description: '목표 달성 여부' })
  isGoalAchieved: boolean; // 에러 해결: 필드 추가

  @ApiProperty({ example: 200, description: '일일 총 탄수화물' })
  totalCarbs: number;

  @ApiProperty({ example: 120, description: '일일 총 단백질' })
  totalProtein: number;

  @ApiProperty({ example: 60, description: '일일 총 지방' })
  totalFat: number;
}

/**
 * 주간 리포트 전체 응답 DTO
 */
export class WeeklyReportResponseDto {
  @ApiProperty({ example: '2026-02-26', description: '리포트 시작일' })
  startDate: string;

  @ApiProperty({ example: '2026-03-04', description: '리포트 종료일' })
  endDate: string;

  @ApiProperty({
    description: '주간 영양 섭취 합계',
    example: { calories: 14700, carbs: 1400, protein: 840, fat: 420 },
  })
  weeklyTotals: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };

  @ApiProperty({
    description: '주간 일일 평균 섭취량',
    example: { calories: 2100, carbs: 200, protein: 120, fat: 60 },
  })
  dailyAverages: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };

  @ApiProperty({
    type: [DailyNutritionDto],
    description: '7일간의 일자별 상세 섭취 내역',
  })
  dailyDetails: DailyNutritionDto[];

  constructor(partial: Partial<WeeklyReportResponseDto>) {
    Object.assign(this, partial);
  }
}