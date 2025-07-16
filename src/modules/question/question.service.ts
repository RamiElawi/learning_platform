import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './questino.repository';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { questionType } from 'src/common/enums/question_type.enum';
import { AddMarkDto } from './dto/AddMarkDto.repository';
import { MarkService } from '../mark/mark.service';
import { CreateMarkDto } from '../mark/dto/create-mark.dto';
import { MARKSTATE } from 'src/common/enums/mark_state.enum';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionRepository) private readonly questionRepo:QuestionRepository,
private readonly answerService:AnswerService,
private readonly markService:MarkService
){}
  
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

  async findAll(questionableId:number,questionableType:questionType) {
    return await this.questionRepo.getQuestions(questionableId,questionableType)
  }

  async findOne(id: number) {
   const question=await this.questionRepo.getQuestionById(id)
    if(!question) throw new NotFoundException('this question is not found')
      return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id)
   return await this.questionRepo.updateQuestion(id,updateQuestionDto)
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.questionRepo.deleteQuestion(id)
  }
  

  async addMark(addMarkDto:AddMarkDto,questionType:questionType,userId:number,questionableId:number){
    console.log(addMarkDto)
    let sum=0;
    let totalSum=0;
    let studentState=MARKSTATE.FAILED;
    let AnswerQuestion=[]

    const questions=await this.findAll(questionableId,questionType)
    //  console.log(questions)

    for(const question of questions){
      // console.log(question.answers)
      for(const answer of question.answers){
        AnswerQuestion.push(answer.id)
      }
    }
    // console.log(userId)
   
     const UserAnswer=await this.answerService.findUserAnswer(userId,AnswerQuestion)
    //  console.log(UserAnswer)

     if(UserAnswer){
       for(const u of UserAnswer){
        await this.answerService.deleteUserAnswer(u.id)
       }
    }

    for(const a of addMarkDto.answer){
      //@ts-ignore
      const question =await this.findOne(a.questionId)
      totalSum+=question.mark;
      //@ts-ignore
      if(question.rightAnswer == a.answer) sum +=question.mark  
      //@ts-ignore
      await this.answerService.addUserAnswers(userId,a.answer)

    };
    // console.log(sum)
    // console.log(totalSum)

    if(sum >= totalSum/2) studentState=MARKSTATE.PASSED;

    const markDto:CreateMarkDto={
      mark:sum,
      markableType:questionType,
      markableId:questionableId,
      userId:userId,
      state:studentState
    }

    const mark=await this.markService.findOne(userId,questionableId,questionType)

    if(mark){
      return await this.markService.update(mark.id,markDto)
    }

    return await this.markService.create(markDto)


  }
  


  async getUserAnswer(userId:number,questionId:number,questionType:questionType){
    return await this.questionRepo.getUserAnswer(userId,questionId,questionType)
  }

}
