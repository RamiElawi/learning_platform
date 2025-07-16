import { EntityRepository, Repository } from "typeorm";
import { Mark } from "./entities/mark.entity";
import { CreateMarkDto } from "./dto/create-mark.dto";
import dataSource from "db/dataSource";
import { UpdateMarkDto } from "./dto/update-mark.dto";
import { questionType } from "src/common/enums/question_type.enum";

@EntityRepository(Mark)
export class MarkRepository extends Repository<Mark>{

    async addMark(createMarkDto:CreateMarkDto){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Mark)
        .values({...createMarkDto})
        .execute()
    }

    async updateMark(markId:number,updateMarkDto:UpdateMarkDto){
        return await dataSource
        .createQueryBuilder()
        .update(Mark)
        .set({...updateMarkDto})
        .where('mark.id = :markId',{markId:markId})
        .execute()
    }

    async deleteMark(markId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Mark)
        .where('mark.id = :markId',{markId:markId})
        .execute()

    }

    async getStudentMark(userId:number,markableId:number,markableType:questionType){
        return await dataSource
        .getRepository(Mark)
        .createQueryBuilder('mark')
        .where('mark.userId = :userId',{userId:userId})
        .andWhere('mark.markableId = :markableId',{markableId:markableId})
        .andWhere('mark.markableType = :markableType',{markableType:markableType})
        .getOne()
    }

    async getOldMark(userId:number,markableId:number,markableType:questionType){
        return await dataSource
        .getRepository(Mark)
        .createQueryBuilder('mark')
        .where('mark.userId = :userId',{userId:userId})
        .andWhere('mark.markableId = :markableId',{markableId:markableId})
        .andWhere('mark.markableType = :markableType',{markableType:markableType})
        .getOne()
    }

    async findAllMark(markableId:number,markableType:questionType){
        return await dataSource
        .getRepository(Mark)
        .createQueryBuilder('mark')
        .where('mark.markableId = :markableId',{markableId:markableId})
        .andWhere('mark.markableType = :markableType',{markableType:markableType})
        .leftJoinAndSelect('mark.user','user')
        .getMany()
    }
}