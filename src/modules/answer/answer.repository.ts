import { EntityRepository, Repository } from "typeorm";
import { Answer } from "./entities/answer.entity"
import { CreateAnswerDto } from "./dto/create-Answer.dto";
import dataSource from "db/dataSource";
import { UpdateAnswerDto } from "./dto/update-Answer.dto";

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer>{
    
    async createAnswer(answer){
       return await dataSource
       .createQueryBuilder()
       .insert()
       .into(Answer)
       .values({...answer})
       .execute()
    }

    async updateAnswer(answerId:number,answer){
        return await dataSource
        .createQueryBuilder()
        .update(Answer)
        .set({...answer})
        .where('id = :answerId',{answerId:answerId})
        .execute()
    }

    async deleteAnswer(answerId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Answer)
        .where('id = :answerId',{answerId:answerId})
        .execute()
    }

    async getAnswers(questionId:number){
        return await dataSource
        .getRepository(Answer)
        .createQueryBuilder('answer')
        .where('answer.questionId = :questionId',{questionId:questionId})
        .getMany()
    }

    async getAnswerById(answerId:number){
        return await dataSource
        .getRepository(Answer)
        .createQueryBuilder('answer')
        .where('answer.id = :answerId',{answerId:answerId})
        .getOne()
    }
}