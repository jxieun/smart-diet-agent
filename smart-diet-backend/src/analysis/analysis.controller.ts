import { Controller, Post, Get, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalysisService } from './analysis.service';

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image')) // 프론트/포스트맨에서 key를 'image'로 보낼 것
  async analyzeMenu(
   @Request() req, 
   @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('이미지 파일이 필요합니다.');
    }
    
    // 실제 저장된 파일 경로 (DB에 저장할 용도)
    const imageUrl = file.path; 
  
    // Saga 시작 및 DB 기록
    const task = await this.analysisService.createAnalysisTask(req.user.id, imageUrl);
  
    return {
      message: '분석 요청이 접수되었습니다.',
      taskId: task.id,
      imageUrl: imageUrl // 테스트 확인용
    };
  }

  @Get('tasks/:taskId')
  async getStatus(@Param('taskId') taskId: string, @Request() req) {
    return this.analysisService.getTaskStatus(taskId, req.user.id);
  }
}