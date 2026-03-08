import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnalysisStatus } from '@prisma/client';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async createAnalysisTask(userId: string, imageUrl: string) {
    // 1. DB에 분석 태스크 생성 (PENDING 상태)
    const task = await this.prisma.analysisTask.create({
      data: {
        userId,
        imageUrl,
        status: AnalysisStatus.PENDING,
      },
    });

    // 2. TODO: RabbitMQ를 통해 FastAPI로 분석 요청 메시지 전송 (Saga 시작)
    // this.amqpConnection.publish('menu_analysis_exchange', 'analyze', { taskId: task.id, imageUrl });

    return task;
  }

  async getTaskStatus(taskId: string, userId: string) {
    return this.prisma.analysisTask.findFirst({
      where: { id: taskId, userId },
    });
  }
}