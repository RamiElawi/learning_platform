import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './questino.repository';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { questionType } from 'src/common/enums/question_type.enum';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionRepository) private readonly questionRepo:QuestionRepository,
private readonly answerService:AnswerService){}
  
  async create(createQuestionDto: CreateQuestionDto,questionableType:questionType,questionableId:number) {
    console.log(createQuestionDto)
    const questionDto={title:createQuestionDto.title,mark:createQuestionDto.mark}
    const question=await this.questionRepo.createQuestion(questionDto,questionableType,questionableId)
    const rightAnswer=await this.answerService.createAnswerw(createQuestionDto.answers.rightAnswer,question.identifiers[0].id)
    await createQuestionDto.answers.answer.forEach(async answer=>{
      await this.answerService.createAnswerw(answer,question.identifiers[0].id)
    })

    return await this.update(question.identifiers[0].id,{rightAnswer:rightAnswer.identifiers[0].id})
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
   return await this.questionRepo.updateQuestion(id,updateQuestionDto)
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
