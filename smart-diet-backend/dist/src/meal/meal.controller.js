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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meal_service_1 = require("./meal.service");
const create_meal_dto_1 = require("./dto/create-meal.dto");
const update_meal_dto_1 = require("./dto/update-meal.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const meal_response_dto_1 = require("./dto/meal-response.dto");
let MealController = class MealController {
    mealService;
    constructor(mealService) {
        this.mealService = mealService;
    }
    async create(req, createMealDto) {
        const meal = await this.mealService.create(req.user.id, createMealDto);
        return new meal_response_dto_1.MealResponseDto(meal);
    }
    async findAll(req) {
        const meals = await this.mealService.findAll(req.user.id);
        return meals.map(meal => new meal_response_dto_1.MealResponseDto(meal));
    }
    findOne(id, req) {
        return this.mealService.findOne(id, req.user.id);
    }
    update(id, req, updateMealDto) {
        return this.mealService.update(id, req.user.id, updateMealDto);
    }
    remove(id, req) {
        return this.mealService.remove(id, req.user.id);
    }
};
exports.MealController = MealController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '식단 기록 생성', description: '현재 로그인한 유저의 식단 데이터를 저장합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '식단 생성 성공', type: meal_response_dto_1.MealResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_meal_dto_1.CreateMealDto]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '내 모든 식단 조회', description: '로그인한 유저가 작성한 모든 식단 리스트를 최신순으로 가져옵니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [meal_response_dto_1.MealResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '식단 상세 조회', description: '특정 식단 기록의 상세 내용을 확인합니다. (본인 데이터만 가능)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '식단 고유 ID (UUID)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '식단 수정', description: '작성한 식단 정보를 수정합니다. 수정하고 싶은 필드만 보내면 됩니다.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '식단 삭제', description: '식단 기록을 영구적으로 삭제합니다.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "remove", null);
exports.MealController = MealController = __decorate([
    (0, swagger_1.ApiTags)('Meals (식단 관리)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('meals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [meal_service_1.MealService])
], MealController);
//# sourceMappingURL=meal.controller.js.map