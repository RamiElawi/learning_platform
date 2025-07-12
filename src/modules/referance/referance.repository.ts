import { EntityRepository, Repository } from "typeorm";
import dataSource from "db/dataSource";
import { Referance } from "./entities/referance.entity";
import { CreateReferanceDto } from "./dto/create-referance.dto";
import { UpdateReferanceDto } from "./dto/update-referance.dto";

@EntityRepository(Referance)
export class ReferanceRepository extends Repository<Referance>{
    async createReferance(createReferanceDto:CreateReferanceDto,userId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Referance)
        .values({...createReferanceDto,userId:userId})
        .execute()
    }

    async findReferanceById(referanceId:number){
        return await dataSource
        .getRepository(Referance)
        .createQueryBuilder('referance')
        .where('referance.id = :referanceId',{referanceId:referanceId})
        .getOne()
    }
   

    async findreferanceByName(name:string){
        return await dataSource
        .getRepository(Referance)
        .createQueryBuilder('referance')
        .where('referance.name = :name',{name:name})
        .getOne()
    }

    async findAllReferance(filterReferanceDto){
        return await dataSource
        .getRepository(Referance)
        .createQueryBuilder('Referance')
        .limit(filterReferanceDto.limit)
        .offset(filterReferanceDto.skip)
        .getMany()
    }

    async updateReferance(referanceId:number,updatereferanceDto:UpdateReferanceDto){
        return await dataSource
        .createQueryBuilder()
        .update(Referance)
        .set({...updatereferanceDto})
        .where('id = :referanceId',{referanceId:referanceId})
        .execute()
    }

    async deleteReferance(referanceId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Referance)
        .where('id = :referanceId',{referanceId:referanceId})
        .execute()
    }
    
}
