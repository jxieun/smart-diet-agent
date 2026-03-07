"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const weekly_report_response_dto_1 = require("./dto/weekly-report-response.dto");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWeeklyReport(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { goalCalories: true },
        });
        const targetCalories = user?.goalCalories || 2000;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        const dailyMap = new Map();
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
        const meals = await this.prisma.meal.findMany({
            where: {
                userId,
                mealDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
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
        dailyMap.forEach((daily) => {
            daily.achievementRate = Math.round((daily.totalCalories / targetCalories) * 100);
            daily.isGoalAchieved =
                daily.totalCalories >= targetCalories * 0.9 &&
                    daily.totalCalories <= targetCalories * 1.1;
        });
        const dailyDetails = Array.from(dailyMap.values());
        const weeklyTotals = dailyDetails.reduce((acc, day) => {
            acc.calories += day.totalCalories;
            acc.carbs += day.totalCarbs;
            acc.protein += day.totalProtein;
            acc.fat += day.totalFat;
            return acc;
        }, { calories: 0, carbs: 0, protein: 0, fat: 0 });
        const dailyAverages = {
            calories: Math.round(weeklyTotals.calories / 7),
            carbs: Math.round(weeklyTotals.carbs / 7),
            protein: Math.round(weeklyTotals.protein / 7),
            fat: Math.round(weeklyTotals.fat / 7),
        };
        return new weekly_report_response_dto_1.WeeklyReportResponseDto({
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            weeklyTotals,
            dailyAverages,
            dailyDetails,
        });
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map