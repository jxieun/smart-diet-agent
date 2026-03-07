import { PrismaService } from '../prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createMealDto: CreateMealDto): Promise<{
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
    findAll(userId: string): Promise<{
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
    }[]>;
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, userId: string, updateMealDto: UpdateMealDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
