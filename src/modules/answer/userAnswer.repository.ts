import { EntityRepository, Repository } from "typeorm";
import { User_Answer } from "./entities/user_answer.entity";
import dataSource from "db/dataSource";

@EntityRepository(User_Answer)
export class UserAnswerRepository extends Repository<User_Answer>{
    async createUserAnswer(answerId:number,userId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(User_Answer)
        .values({answerId:answerId,userId:userId})
        .execute()
    }

    async findUserAnswer(userId:number,answers:number[]){
        return await dataSource
        .getRepository(User_Answer)
        .createQueryBuilder('userAnswer')
        .where('userAnswer.answerId IN (:...answers)',{answers})
        .andWhere('userAnswer.userId = :userId',{userId:userId})
        .getMany()
    }

    async deleteUserAnswer(id:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(User_Answer)
        .where('id = :id',{id:id})
        .execute()
    }

   
}