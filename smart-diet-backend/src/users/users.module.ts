// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  // 이 모듈에서 사용할 컨트롤러를 등록
  controllers: [UsersController],
  // 이 모듈에서 사용할 서비스를 등록
  providers: [UsersService],
})
export class UsersModule {} // 이 이름이 app.module.ts에서 불러오는 이름과 같아야 함.