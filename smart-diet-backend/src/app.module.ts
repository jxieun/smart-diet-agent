import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // 1. UsersModule을 불러옴
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule], // 2. 여기에 추가해야 서버가 UsersController와 AuthController를 인식함
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
