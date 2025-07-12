import { EntityRepository, Repository } from "typeorm";
import { Subject } from "./entities/subject.entity";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import dataSource from "db/dataSource";
import { UpdateSubjectDto } from "./dto/update-subject.dto";

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject>{

    async createSubject(createSubjectDto:CreateSubjectDto,classId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Subject)
        .values({...createSubjectDto,classId:classId})
        .execute()
    }

    async updateSubject(subId:number,updateSubjectDto:UpdateSubjectDto){
        return await dataSource
        .createQueryBuilder()
        .update(Subject)
        .set({...updateSubjectDto})
        .where('id = :subId',{subId:subId})
        .execute()
    }

    async deleteSubject(subId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Subject)
        .where('id = :subId',{subId:subId})
        .execute()
    }

    async getAllSubject(classId:number){
        return await dataSource
        .getRepository(Subject)
        .createQueryBuilder('subject')
        .where('subject.classId = :classId',{classId:classId})
        .getMany()
    }

    async getSubjectById(subId:number){
        return await dataSource
        .getRepository(Subject)
        .createQueryBuilder('subject')
        .where('subject.id = :subId',{subId:subId})
        .getOne()
    }

    async findOldSubject(classId:number,name:string){
        return await dataSource
        .getRepository(Subject)
        .createQueryBuilder('subject')
        .where('subject.classId = :classId',{classId:classId})
        .andWhere('subject.name = :name',{name:name})
        .getOne()
    }

}