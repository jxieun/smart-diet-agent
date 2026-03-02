import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // 1. UsersModule을 불러옴
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, 
    // isGlobal: true를 설정하면 모든 모듈에서 별도의 import 없이 ConfigService를 쓸 수 있습니다.
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule], // 2. 여기에 추가해야 서버가 UsersController와 AuthController를 인식함
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
