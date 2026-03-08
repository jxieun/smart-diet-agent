import { 
  Controller, 
  Post, 
  Get, 
  Param, 
  UseGuards, 
  Request, 
  UseInterceptors, 
  UploadedFile, 
  HttpStatus,
  ParseFilePipeBuilder,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalysisService } from './analysis.service';

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image')) // 포스트맨의 Body > form-data에서 Key를 'image'로 설정
  async analyzeMenu(
    @Request() req, 
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: '파일 크기는 5MB를 초과할 수 없습니다.',
        })
        .build({
          // ✅ 에러 발생 시 커스텀 응답 설정
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
         }),
    ) file: Express.Multer.File,
  ) {
    // ✅ mimetype 직접 검증
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('이미지 파일만 업로드 가능합니다. (jpeg, jpg, png, gif)');
    }
    // 위 파이프에서 검증을 통과해야만 이 로직이 실행
    
    // 1. 실제 저장된 파일 경로 (Prisma DB 저장용)
    const imageUrl = file.path; 
  
    // 2. AnalysisTask 생성 및 Saga 패턴의 시작 (Service 호출)
    const task = await this.analysisService.createAnalysisTask(req.user.id, imageUrl);
  
    return {
      message: '메뉴판 분석 요청이 성공적으로 접수되었습니다.',
      taskId: task.id,
      imageUrl: imageUrl // 프론트/테스트 확인용 경로 반환
    };
  }

  @Get('tasks/:taskId')
  async getStatus(@Param('taskId') taskId: string, @Request() req) {
    // 본인의 분석 태스크 상태만 조회할 수 있도록 보안 처리
    return this.analysisService.getTaskStatus(taskId, req.user.id);
  }
}