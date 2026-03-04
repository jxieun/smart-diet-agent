import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Meals (식단 관리)') // Swagger에서 그룹화될 이름
@ApiBearerAuth() // JWT 인증이 필요한 API임을 표시 (자물쇠 아이콘 생성)
@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ summary: '식단 기록 생성', description: '현재 로그인한 유저의 식단 데이터를 저장합니다.' })
  @ApiResponse({ status: 201, description: '식단 생성 성공' })
  create(@Request() req, @Body() createMealDto: CreateMealDto) {
    return this.mealService.create(req.user.id, createMealDto);
  }

  @Get()
  @ApiOperation({ summary: '내 모든 식단 조회', description: '로그인한 유저가 작성한 모든 식단 리스트를 최신순으로 가져옵니다.' })
  findAll(@Request() req) {
    return this.mealService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '식단 상세 조회', description: '특정 식단 기록의 상세 내용을 확인합니다. (본인 데이터만 가능)' })
  @ApiParam({ name: 'id', description: '식단 고유 ID (UUID)' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.mealService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '식단 수정', description: '작성한 식단 정보를 수정합니다. 수정하고 싶은 필드만 보내면 됩니다.' })
  update(@Param('id') id: string, @Request() req, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, req.user.id, updateMealDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '식단 삭제', description: '식단 기록을 영구적으로 삭제합니다.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.mealService.remove(id, req.user.id);
  }
}