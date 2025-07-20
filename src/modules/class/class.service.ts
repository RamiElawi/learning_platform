import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRepository } from './class.repository';
import { Repository } from 'typeorm';
import { roles } from 'src/common/enums/user_role.enum';
import { FilterClassDto } from './dto/filterClassDto.dto';

@Injectable()
export class ClassService {
  
  constructor(@InjectRepository(ClassRepository) private readonly classRepo:ClassRepository,
    private readonly userService:UserService){}

  async create(createClassDto: CreateClassDto) {
    await this.findalreadyOne(createClassDto.name)
    return await this.classRepo.createClass(createClassDto)
  }

  // async addToClass(userId:number,classId:number){
  //   const user=await this.userService.findOne(userId)
  //   if(user.role != roles.USER) throw new BadRequestException('you cann\'t add this user, It is not student')
  //   await this.findOne(classId);
  //   return await this.userService.update(userId,{classId:classId})

  // }

  async findAll(filterClassDto:FilterClassDto) {
    let classes=await this.classRepo.findAllClasses(filterClassDto)
    return classes;
  }

  async findalreadyOne(name:string){
      const clas=await this.classRepo.findClassByName(name)
      if(clas) throw new BadRequestException('this class is already exist')
      return true;
    }

  async findOne(classId: number) {
    const clas =await this.classRepo.findClassById(classId)
    if(!clas) throw new NotFoundException('this class is not found')
    return clas;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    await this.findOne(id)
    await this.findalreadyOne(updateClassDto.name)
    return await this.classRepo.updateClass(id,updateClassDto)
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.classRepo.deleteClass(id)
  }
}
