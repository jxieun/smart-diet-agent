export declare class DailyNutritionDto {
    date: string;
    totalCalories: number;
    targetCalories: number;
    achievementRate: number;
    isGoalAchieved: boolean;
    totalCarbs: number;
    totalProtein: number;
    totalFat: number;
}
export declare class WeeklyReportResponseDto {
    startDate: string;
    endDate: string;
    weeklyTotals: {
        calories: number;
        carbs: number;
        protein: number;
        fat: number;
    };
    dailyAverages: {
        calories: number;
        carbs: number;
        protein: number;
        fat: number;
    };
    dailyDetails: DailyNutritionDto[];
    constructor(partial: Partial<WeeklyReportResponseDto>);
}
