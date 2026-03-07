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
exports.WeeklyReportResponseDto = exports.DailyNutritionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DailyNutritionDto {
    date;
    totalCalories;
    targetCalories;
    achievementRate;
    isGoalAchieved;
    totalCarbs;
    totalProtein;
    totalFat;
}
exports.DailyNutritionDto = DailyNutritionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-04', description: '날짜' }),
    __metadata("design:type", String)
], DailyNutritionDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2100, description: '일일 총 칼로리' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "totalCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000, description: '목표 칼로리' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "targetCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95, description: '달성률 (%)' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "achievementRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: '목표 달성 여부' }),
    __metadata("design:type", Boolean)
], DailyNutritionDto.prototype, "isGoalAchieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: '일일 총 탄수화물' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "totalCarbs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: '일일 총 단백질' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "totalProtein", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60, description: '일일 총 지방' }),
    __metadata("design:type", Number)
], DailyNutritionDto.prototype, "totalFat", void 0);
class WeeklyReportResponseDto {
    startDate;
    endDate;
    weeklyTotals;
    dailyAverages;
    dailyDetails;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.WeeklyReportResponseDto = WeeklyReportResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-26', description: '리포트 시작일' }),
    __metadata("design:type", String)
], WeeklyReportResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-04', description: '리포트 종료일' }),
    __metadata("design:type", String)
], WeeklyReportResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주간 영양 섭취 합계',
        example: { calories: 14700, carbs: 1400, protein: 840, fat: 420 },
    }),
    __metadata("design:type", Object)
], WeeklyReportResponseDto.prototype, "weeklyTotals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주간 일일 평균 섭취량',
        example: { calories: 2100, carbs: 200, protein: 120, fat: 60 },
    }),
    __metadata("design:type", Object)
], WeeklyReportResponseDto.prototype, "dailyAverages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [DailyNutritionDto],
        description: '7일간의 일자별 상세 섭취 내역',
    }),
    __metadata("design:type", Array)
], WeeklyReportResponseDto.prototype, "dailyDetails", void 0);
//# sourceMappingURL=weekly-report-response.dto.js.map