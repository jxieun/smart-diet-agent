import { Injectable, NotFoundException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../prisma/prisma.service';
import { AnalysisStatus } from '@prisma/client';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService, private readonly amqpConnection: AmqpConnection,) {}

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

    // 2. 🚀 RabbitMQ로 분석 요청 메시지 전송
    // 'menu_analysis_exchange' 통로로 'analyze.request'라는 이름표를 붙여서 보냄
    await this.amqpConnection.publish('menu_analysis_exchange', 'analyze.request', {
      taskId: task.id,
      imageUrl: task.imageUrl,
      targetCalories: task.targetCalories,
      userId: task.userId,
    });

    return task;
  }

  async getTaskStatus(taskId: string, userId: string) {
    return this.prisma.analysisTask.findFirst({
      where: { id: taskId, userId },
    });
  }
}