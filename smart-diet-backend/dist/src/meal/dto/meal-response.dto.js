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
exports.MealResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class MealResponseDto {
    id;
    title;
    mealType;
    calories;
    mealDate;
    constructor(meal) {
        this.id = meal.id;
        this.title = meal.title;
        this.mealType = meal.mealType;
        this.calories = meal.calories;
        this.mealDate = meal.mealDate;
    }
}
exports.MealResponseDto = MealResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '식단 고유 ID', example: 'uuid-1234' }),
    __metadata("design:type", String)
], MealResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '음식 이름', example: '닭가슴살 샐러드' }),
    __metadata("design:type", String)
], MealResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '식사 유형', enum: client_1.MealType }),
    __metadata("design:type", String)
], MealResponseDto.prototype, "mealType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '칼로리', example: 350 }),
    __metadata("design:type", Number)
], MealResponseDto.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '식사 일시', example: '2026-03-02T16:00:00Z' }),
    __metadata("design:type", Date)
], MealResponseDto.prototype, "mealDate", void 0);
//# sourceMappingURL=meal-response.dto.js.map