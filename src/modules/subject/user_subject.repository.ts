import { EntityRepository, Repository } from "typeorm";
import { UserSubject } from "./entities/user_subject.entity";
import dataSource from "db/dataSource";

@EntityRepository(UserSubject)
export class UserSubjectRepository extends Repository<UserSubject>{

    async createUserSubject(userId:number,subjectId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(UserSubject)
        .values({userId:userId,subjectId:subjectId})
        .execute()
    }

    async deleteUserSubject(userId:number,subjectId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(UserSubject)
        .where('userId = :userId',{userId:userId})
        .andWhere('subjectId = :subjectId',{subjectId:subjectId})
        .execute()
    }

    async getUsersForSubject(subjectId:number){
        return await dataSource
        .getRepository(UserSubject)
        .createQueryBuilder('userSubject')
        .where('userSubject.subjectId = :subjectId',{subjectId:subjectId})
        .leftJoinAndSelect('userSubject.user','user')
        .getMany()
    }

    async getUserSubject(userId:number,subjectId:number){
        return await dataSource
        .getRepository(UserSubject)
        .createQueryBuilder('userSubject')
        .where('userSubject.userId = :userId',{userId:userId})
        .andWhere('userSubject.subjectId = :subjectId',{subjectId:subjectId})
        .getOne()
    }

}