import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './questino.repository';
import { AnswerModule } from '../answer/answer.module';
import { MarkModule } from '../mark/mark.module';

@Module({
  imports:[TypeOrmModule.forFeature([Question]),AnswerModule,MarkModule],
  controllers: [QuestionController],
  providers: [QuestionService,QuestionRepository],
})
export class QuestionModule {}
