import { Injectable } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkRepository } from './mark.repository';
import { questionType } from 'src/common/enums/question_type.enum';

@Injectable()
export class MarkService {

  constructor(@InjectRepository(MarkRepository) private readonly markRepo:MarkRepository){}

  async create(createMarkDto: CreateMarkDto) {
    return await this.markRepo.addMark(createMarkDto)  
  }

  async findAll(markableId:number,markableType:questionType) {
    return await this.markRepo.findAllMark(markableId,markableType)
  }

  async findOne(userId:number,markableId:number,markableType:questionType) {
    return await this.markRepo.getOldMark(userId,markableId,markableType)
  } 

  async update(id: number, updateMarkDto: UpdateMarkDto) {
    return await this.markRepo.updateMark(id,updateMarkDto)
  }

  async remove(id: number) {
    return await this.markRepo.deleteMark(id);
  }

  async getStudentMark(userId:number,markableId:number,markableType:questionType){
    console.log('34',userId,markableId,markableType)
    return await this.markRepo.getStudentMark(userId,markableId,markableType)
  }
}
