import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';

// CreateMealDto의 모든 필드를 선택사항(Optional)으로 상속받음
export class UpdateMealDto extends PartialType(CreateMealDto) {}