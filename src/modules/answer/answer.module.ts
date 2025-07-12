import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { User_Answer } from './entities/user_answer.entity';
import { AnswerRepository } from './answer.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService,AnswerRepository],
  exports:[AnswerService,AnswerRepository]
})
export class AnswerModule {}
