import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealResponseDto } from './dto/meal-response.dto';
export declare class MealController {
    private readonly mealService;
    constructor(mealService: MealService);
    create(req: any, createMealDto: CreateMealDto): Promise<MealResponseDto>;
    findAll(req: any): Promise<MealResponseDto[]>;
    findOne(id: string, req: any): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        mealType: import("@prisma/client").$Enums.MealType;
        calories: number;
        carbs: number | null;
        protein: number | null;
        fat: number | null;
        mealDate: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, req: any, updateMealDto: UpdateMealDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        mealType: import("@prisma/client").$Enums.MealType;
        calories: number;
        carbs: number | null;
        protein: number | null;
        fat: number | null;
        mealDate: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string, req: any): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        mealType: import("@prisma/client").$Enums.MealType;
        calories: number;
        carbs: number | null;
        protein: number | null;
        fat: number | null;
        mealDate: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
