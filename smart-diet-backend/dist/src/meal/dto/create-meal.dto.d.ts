import { MealType } from '@prisma/client';
export declare class CreateMealDto {
    title: string;
    mealType: MealType;
    calories: number;
    carbs?: number;
    protein?: number;
    fat?: number;
}
