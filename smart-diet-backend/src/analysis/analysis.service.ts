import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnalysisStatus } from '@prisma/client';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async createAnalysisTask(userId: string, imageUrl: string) {
    // 1. 유저 정보를 조회하여 일일 목표 칼로리(goalCalories) 가져오기
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { goalCalories: true },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 1. DB에 분석 태스크 생성 (PENDING 상태)
    const task = await this.prisma.analysisTask.create({
      data: {
        userId,
        imageUrl,
        targetCalories: user.goalCalories, // 유저의 현재 목표를 기록
        status: AnalysisStatus.PENDING,
      },
    });

    // 3. Saga 패턴 시작: FastAPI로 보낼 메시지에 목표 칼로리 포함
    // 이 정보가 나중에 AI 엔진이 조언을 생성하는 기준이 됩니다.
    /*
    this.amqpConnection.publish('menu_analysis_exchange', 'analyze', { 
      taskId: task.id, 
      imageUrl, 
      targetCalories: user.goalCalories 
    });
    */

    return task;
  }

  async getTaskStatus(taskId: string, userId: string) {
    return this.prisma.analysisTask.findFirst({
      where: { id: taskId, userId },
    });
  }
}