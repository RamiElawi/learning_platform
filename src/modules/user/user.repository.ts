import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import dataSource from "../../../db/dataSource";
import { UpdateUserDto } from "./dto/update-user.dto";
import { gender } from "../../common/enums/user_gender.enum";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    

    async insertUser(createUserDto:CreateUserDto):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({...createUserDto})
        .execute()
    }

    async findOneByEmail(email:string):Promise<User>{
        
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .addSelect('users.password')
        .where('users.email = :email',{email})
        .getOne()
    }

    async getUserById(userId:number):Promise<User>{
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.id = :userId',{userId})
        .getOne()
    }

    async getUsers(limit?:number,skip?:number):Promise<User[]>{
        const query = await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        
        return query
        .limit(limit)
        .offset(skip)
        .getMany()



    }

    async updateUser(userId:number,updateUserDto:UpdateUserDto):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(User)
        .set({...updateUserDto})
        .where('id = :userId',{userId})
        .execute()
    }

    async deleteUser(userId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('users.id = :userId',{userId})
        .execute()
    }


    async getMe(userId:number){
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.id = :userId',{userId})
        .getOne()
    }

    async logOut(userId:number){
        return await dataSource
        .createQueryBuilder()
        .update(User)
        .set({hashedRt:null})
        .where('id = :userId',{userId})
        .execute()
    }
}