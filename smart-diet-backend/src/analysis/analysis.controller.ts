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
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiConsumes, 
  ApiBody, 
  ApiParam 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalysisService } from './analysis.service';

@ApiTags('Analysis (메뉴 분석)') // Swagger에서 그룹화될 이름
@ApiBearerAuth() // JWT 자물쇠 아이콘 활성화
@Controller('meals')
@UseGuards(JwtAuthGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ 
    summary: '메뉴판 분석 요청', 
    description: '메뉴판 이미지를 업로드하여 AI 분석 태스크를 생성합니다. 분석 시점의 유저 목표 칼로리가 함께 저장됩니다.' 
  })
  @ApiConsumes('multipart/form-data') // 파일 업로드를 위한 설정
  @ApiBody({
    description: '메뉴판 이미지 파일 (jpg, png 등)',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger UI에서 파일 선택창이 뜨게 함
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '분석 요청 접수 성공 (taskId 반환)' })
  @ApiResponse({ status: 400, description: '잘못된 파일 형식 또는 용량 초과' })
  async analyzeMenu(
    @Request() req, 
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: '파일 크기는 5MB를 초과할 수 없습니다.',
        })
        .build({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
         }),
    ) file: Express.Multer.File,
  ) {
    // mimetype 직접 검증
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('이미지 파일만 업로드 가능합니다. (jpeg, jpg, png, gif)');
    }
    
    const imageUrl = file.path; 
    const task = await this.analysisService.createAnalysisTask(req.user.id, imageUrl);
  
    return {
      message: '메뉴판 분석 요청이 성공적으로 접수되었습니다.',
      taskId: task.id,
      imageUrl: imageUrl
    };
  }

  @Get('tasks/:taskId')
  @ApiOperation({ 
    summary: '분석 상태 및 결과 조회', 
    description: '생성된 분석 태스크의 현재 진행 상태(PENDING, COMPLETED 등)와 AI 분석 결과를 조회합니다.' 
  })
  @ApiParam({ 
    name: 'taskId', 
    description: '분석 요청 시 발급받은 작업 ID (UUID)',
    example: '8cbe8489-7e5d-4a1e-8f92-...' 
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 404, description: '해당 작업을 찾을 수 없음' })
  async getStatus(@Param('taskId') taskId: string, @Request() req) {
    return this.analysisService.getTaskStatus(taskId, req.user.id);
  }
}