import { EntityRepository, Repository } from "typeorm";
import {Class} from './entities/class.entity'
import { InjectRepository } from "@nestjs/typeorm";
import dataSource from "db/dataSource";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@EntityRepository(Class)
export class ClassRepository extends Repository<Class>{
    async createClass(createClassDto:CreateClassDto){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Class)
        .values({...createClassDto})
        .execute()
    }

    async findClassById(classId:number){
        return await dataSource
        .getRepository(Class)
        .createQueryBuilder('class')
        .where('class.id = :classId',{classId:classId})
        .getOne()
    }
    async findClassByName(name:string){
        return await dataSource
        .getRepository(Class)
        .createQueryBuilder('class')
        .where('class.name = :name',{name:name})
        .getOne()
    }

    async findAllClasses(filterClassDto){
        return await dataSource
        .getRepository(Class)
        .createQueryBuilder('class')
        .limit(filterClassDto.limit)
        .offset(filterClassDto.skip)
        .getMany()
    }

    async updateClass(classId:number,updateClassDto:UpdateClassDto){
        return await dataSource
        .createQueryBuilder()
        .update(Class)
        .set({...updateClassDto})
        .where('id = :classId',{classId:classId})
        .execute()
    }

    async deleteClass(classId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Class)
        .where('id = :classId',{classId:classId})
        .execute()
    }
    
}
