import { MealType } from '@prisma/client';
export declare class MealResponseDto {
    id: string;
    title: string;
    mealType: MealType;
    calories: number;
    mealDate: Date;
    constructor(meal: any);
}
