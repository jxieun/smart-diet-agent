import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // 인증 가드 적용
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WeeklyReportResponseDto } from './dto/weekly-report-response.dto';

@ApiTags('reports') // Swagger 카테고리 설정
@ApiBearerAuth() // Swagger에서 JWT 토큰 인증 활성화
@UseGuards(JwtAuthGuard) // 모든 리포트 요청은 로그인 필수
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('weekly')
  @ApiOperation({ 
    summary: '주간 영양 리포트 조회', 
    description: '최근 7일간의 식단 데이터를 분석하여 영양 통계를 반환합니다.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '리포트 생성 성공', 
    type: WeeklyReportResponseDto 
  })
  async getWeeklyReport(@Req() req) {
    // 인증된 사용자의 ID를 Service에 전달합니다.
    return this.reportsService.getWeeklyReport(req.user.id);
  }
}