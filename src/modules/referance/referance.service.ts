import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferanceDto } from './dto/create-referance.dto';
import { UpdateReferanceDto } from './dto/update-referance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferanceRepository } from './referance.repository';
import { filter } from 'rxjs';
import { FilterReferanceDto } from './dto/filterReferanceDto.dto';

@Injectable()
export class ReferanceService {
  constructor(@InjectRepository(ReferanceRepository) private readonly refRepo:ReferanceRepository){}
  
  async create(createReferanceDto: CreateReferanceDto,userId:number) {
    return await this.refRepo.createReferance(createReferanceDto,userId)
  }

  async findAll(filterReferanceDto:FilterReferanceDto) {
    return await this.refRepo.findAllReferance(filterReferanceDto)
  }

  async findOneById(id: number) {
    const ref=await this.refRepo.findReferanceById(id)
    if(!ref) throw new NotFoundException('this referance is not found')
      return ref
  }
  async findOneByName(name:string) {
    const ref=await this.refRepo.findreferanceByName(name)
    if(!ref) throw new NotFoundException('this referance is not found')
      return ref
  }

  async update(id: number, updateReferanceDto: UpdateReferanceDto) {
    await this.findOneById(id)
    return await this.refRepo.updateReferance(id,updateReferanceDto)
  }

  async remove(id: number) {
    await this.findOneById(id)
    return await this.refRepo.deleteReferance(id)
  }
}
