import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {

  constructor(@InjectRepository(AnswerRepository) private readonly answerRepo:AnswerRepository){}

  async createAnswerw(answer:string,questionId:number) {
    const answerDto={answer,questionId}
    console.log(answerDto)
    return await this.answerRepo.createAnswer(answerDto)
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
