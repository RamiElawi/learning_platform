import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonRepository) private readonly lessonRepo:LessonRepository){}
  
  async create(createLessonDto: CreateLessonDto,subjectId:number) {
    return await this.lessonRepo.createLesson(createLessonDto,subjectId)
  }

  async findAll(subjectId:number) {
    return await this.lessonRepo.getAllLessonBySubject(subjectId)
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepo.getLessonById(id)
    if (!lesson ) throw new NotFoundException('this lesson is not found')
      return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    await this.findOne(id)
    return await this.lessonRepo.updateLesson(id,updateLessonDto)
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.lessonRepo.deleteLesson(id)
  }
}
