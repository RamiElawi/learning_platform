import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { timeStamp } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepository } from './subject.repository';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { UserSubjectRepository } from './user_subject.repository';
import { roles } from 'src/common/enums/user_role.enum';

@Injectable()
export class SubjectService {

  constructor(
    @InjectRepository(SubjectRepository) private readonly subRepo:SubjectRepository
  ,@InjectRepository(UserSubjectRepository) private readonly userSubRepo:UserSubjectRepository
  ){}

  async create(createSubjectDto: CreateSubjectDto,classId:number) {
    await this.findAlreadySubject(classId,createSubjectDto.name)
    return await this.subRepo.createSubject(createSubjectDto,classId)
  }

  async findAll(classId:number) {
    return await this.subRepo.getAllSubject(classId)
  }

  async findAlreadySubject(classId:number,name:string){
    const sub=await this.subRepo.findOldSubject(classId,name)
    if(sub) throw new BadRequestException('this subject is already exist')
    return true;
  }

  async findOne(id: number) {
    const sub=await this.subRepo.getSubjectById(id)
    if(!sub) throw new NotFoundException('this subject is not found')
      return sub;  
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id)
    await this.findAlreadySubject(updateSubjectDto.classId,updateSubjectDto.name)
    return await this.subRepo.updateSubject(id,updateSubjectDto)
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.subRepo.deleteSubject(id)
  }

  async addUserToSubject(userId:number,subjectId:number){
    return await this.userSubRepo.createUserSubject(userId,subjectId)
  }

  async deleteUserFromSubject(userId:number,subjectId:number){
    return await this.userSubRepo.deleteUserSubject(userId,subjectId)
  }

  async getUserFromSubject(subjectId:number){
    return await this.userSubRepo.getUsersForSubject(subjectId)
  }

  async getUserSubject(userId:number,subjectId:number){
    return await this.userSubRepo.getUserSubject(userId,subjectId)
  }
  
}
