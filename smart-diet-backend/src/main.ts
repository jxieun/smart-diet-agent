// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Swagger 관련 모듈 가져옴.
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Swagger 설정 객체 만듦.
  const config = new DocumentBuilder()
    .setTitle('Smart Diet Agent API') // API 제목
    .setDescription('스마트 식단 관리 에이전트 API 명세서') 
    .setVersion('1.0') // 버전
    .addTag('auth') // 태그를 달아두면 나중에 찾기 편함.
    .addBearerAuth() // 나중에 JWT 쓸 때 필요한 버튼
    .build();

  // 2. Swagger 문서를 생성
  const document = SwaggerModule.createDocument(app, config);

  // 3. 'api'라는 주소로 Swagger UI를 노출
  SwaggerModule.setup('api', app, document);

  // 4. 유효성 검사 파이프도 같이 작동하게 함.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
