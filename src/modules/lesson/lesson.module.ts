import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { SubjectModule } from '../subject/subject.module';
import { MarkModule } from '../mark/mark.module';

@Module({
  imports:[TypeOrmModule.forFeature([Lesson]),SubjectModule,MarkModule],
  controllers: [LessonController],
  providers: [LessonService,LessonRepository],
})
export class LessonModule {}
