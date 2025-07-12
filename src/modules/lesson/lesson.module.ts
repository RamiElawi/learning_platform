import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService,LessonRepository],
})
export class LessonModule {}
