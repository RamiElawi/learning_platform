import { EntityRepository, Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import dataSource from "db/dataSource";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { questionType } from "src/common/enums/question_type.enum";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question>{
    
    async createQuestion(createQuestionDto,questionableType:questionType,questionableId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values({...createQuestionDto,questionableType:questionableType,questionableId:questionableId})
        .execute()
    }

    async updateQuestion(questionId:number,updateQuestionDto:UpdateQuestionDto){
        return await dataSource
        .createQueryBuilder()
        .update(Question)
        .set({...updateQuestionDto})
        .where('id = :questionId',{questionId:questionId})
        .execute()
    }

    async deleteQuestion(questionId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Question)
        .where('id = :questionId',{questionId:questionId})
        .execute()
    }

    async getQuestions(questionableId:number,questionableType:questionType){
        return await dataSource
        .getRepository(Question)
        .createQueryBuilder('question')
        .where('question.questionableId = :questionableId',{questionableId:questionableId})
        .andWhere('question.questionableType = :questionableType',{questionableType:questionableType})
        .getMany()
    }

    async getQuestionById(questionId:number){
        return await dataSource
        .getRepository(Question)
        .createQueryBuilder('question')
        .where('question.id = :questionId',{questionId:questionId})
        .getOne()
    }
}