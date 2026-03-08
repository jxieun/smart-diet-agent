import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        // 📂 프로젝트 루트의 uploads 폴더에 저장합
        destination: './uploads', 
        filename: (req, file, callback) => {
          // 파일명 중복 방지를 위해 UUID나 타임스탬프를 사용
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      // 🛡️ 파일 크기 제한 (예: 5MB)
      limits: { fileSize: 5 * 1024 * 1024 }, 
    }),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}