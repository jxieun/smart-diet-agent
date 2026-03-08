import { Controller, Post, Get, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalysisService } from './analysis.service';

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image')) // 'image' 키로 파일을 받음
  async analyzeMenu(@Request() req, @UploadedFile() file: Express.Multer.File) {
    // 1. TODO: 파일 저장 로직 (S3 또는 로컬)
    const imageUrl = `/uploads/${file.filename}`; 
    
    // 2. 분석 태스크 생성 및 Saga 시작
    const task = await this.analysisService.createAnalysisTask(req.user.id, imageUrl);
    
    return {
      message: '분석 요청이 접수되었습니다.',
      taskId: task.id,
    };
  }

  @Get('tasks/:taskId')
  async getStatus(@Param('taskId') taskId: string, @Request() req) {
    return this.analysisService.getTaskStatus(taskId, req.user.id);
  }
}