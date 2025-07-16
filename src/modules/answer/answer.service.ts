import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';
import { UserAnswerRepository } from './userAnswer.repository';
import { questionType } from 'src/common/enums/question_type.enum';

@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(AnswerRepository) private readonly answerRepo:AnswerRepository,
    @InjectRepository(UserAnswerRepository) private readonly userAnswerRepo:UserAnswerRepository
  ){}

  async createAnswerw(answer:string,questionId:number) {
    const answerDto={answer,questionId}
    console.log(answerDto)
    return await this.answerRepo.createAnswer(answerDto)
  }

  async findAll(questionId:number) {
    return await this.answerRepo.getAnswers(questionId)
  }

  async findOne(id: number) {
    return await this.answerRepo.getAnswerById(id)
  }

  async update(id: number,answer:string) {
    const answerDto={answer}
    return await this.answerRepo.updateAnswer(id,answerDto)
  }

  async remove(id: number) {
    return await this.answerRepo.deleteAnswer(id)
  }

  async addUserAnswers(userId:number,answerId:number){
    return await this.userAnswerRepo.createUserAnswer(answerId,userId)
  }

  async findUserAnswer(userId:number,answers:number[]){
    return await this.userAnswerRepo.findUserAnswer(userId,answers)
  }

  async deleteUserAnswer(id:number){
    return await this.userAnswerRepo.deleteUserAnswer(id)
  }

  // async getUserAnswer(userId:number,questionId:number,questionType:questionType){
  //   return await this.userAnswerRepo
  // }
}
