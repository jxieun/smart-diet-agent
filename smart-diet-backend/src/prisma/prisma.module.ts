import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // 경로 주의! 서비스 파일이 같은 폴더에 있어야 함

@Global() // 전역 모듈로 선언! 이제 다른 모듈에서 'imports'에 넣지 않아도 됨
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 다른 곳에서 쓸 수 있게 내보내기
})
export class PrismaModule {}