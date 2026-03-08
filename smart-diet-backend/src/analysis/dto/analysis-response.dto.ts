import { ApiProperty } from '@nestjs/swagger';
import { AnalysisStatus } from '@prisma/client';

export class AnalysisResponseDto {
  @ApiProperty({ description: '분석 태스크 고유 ID (UUID)', example: '8cbe8489-7e5d-4a1e-8f92-...' })
  id: string;

  @ApiProperty({ description: '분석 진행 상태', enum: AnalysisStatus, example: 'PENDING' })
  status: AnalysisStatus;

  @ApiProperty({ description: '업로드된 이미지 경로', example: 'uploads/image-123.jpg' })
  imageUrl: string;

  @ApiProperty({ description: '분석 시점의 유저 목표 칼로리', example: 2500, required: false })
  targetCalories: number;

  @ApiProperty({ description: 'AI 분석 결과 데이터 (JSON)', required: false, nullable: true })
  result: any;

  @ApiProperty({ description: '에러 발생 시 메시지', required: false, nullable: true })
  errorMessage: string;

  @ApiProperty({ description: '생성 일시' })
  createdAt: Date;

  constructor(partial: Partial<AnalysisResponseDto>) {
    Object.assign(this, partial);
  }
}