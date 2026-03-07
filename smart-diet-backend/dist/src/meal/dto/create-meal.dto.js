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
exports.CreateMealDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateMealDto {
    title;
    mealType;
    calories;
    carbs;
    protein;
    fat;
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '음식 이름 또는 식사 메뉴', example: '닭가슴살 샐러드' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '음식 이름을 입력해주세요.' }),
    __metadata("design:type", String)
], CreateMealDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '식사 유형',
        enum: client_1.MealType,
        example: client_1.MealType.LUNCH
    }),
    (0, class_validator_1.IsEnum)(client_1.MealType, { message: '올바른 식사 유형을 선택해주세요. (BREAKFAST, LUNCH, DINNER, SNACK)' }),
    __metadata("design:type", String)
], CreateMealDto.prototype, "mealType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '섭취 칼로리 (kcal)', example: 350 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)({ message: '칼로리를 입력해주세요.' }),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "calories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '탄수화물 함량 (g)', example: 10.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "carbs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '단백질 함량 (g)', example: 30.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "protein", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '지방 함량 (g)', example: 5.8 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "fat", void 0);
//# sourceMappingURL=create-meal.dto.js.map