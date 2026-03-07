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
exports.AuthController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const user_response_dto_1 = require("./dto/user-response.dto");
const signup_dto_1 = require("./dto/signup.dto");
const update_preferences_dto_1 = require("./dto/update-preferences.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signup(dto) {
        return this.authService.signup(dto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    getProfile(req) {
        return {
            message: '내 정보 조회 성공',
            user: new user_response_dto_1.UserResponseDto(req.user),
        };
    }
    async updatePreferences(req, updateDto) {
        const updatedUser = await this.authService.updateUserPreferences(req.user.id, updateDto);
        return {
            message: '사용자 정보 수정 성공',
            user: new user_response_dto_1.UserResponseDto(updatedUser),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: '회원가입 API',
        description: '새로운 사용자를 생성하고 정보를 저장함.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '회원가입 성공함.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 입력값(이메일 형식 등)임.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: '이미 가입된 이메일임.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 API', description: '이메일과 비밀번호로 로그인을 시도함.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공 및 JWT 토큰 발급',
        schema: {
            example: { accessToken: 'eyJhbGciOiJIUzI1Ni...' }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '내 정보 조회 API',
        description: 'JWT 토큰을 이용하여 현재 로그인한 사용자의 정보를 가져옵니다.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '조회 성공',
        type: user_response_dto_1.UserResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '토큰이 없거나 유효하지 않음' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('preferences'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '사용자 목표 및 프로필 수정 API',
        description: '닉네임이나 목표 칼로리를 선택적으로 변경합니다.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '수정 성공',
        type: user_response_dto_1.UserResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_preferences_dto_1.UpdateUserPreferencesDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePreferences", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map