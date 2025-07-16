import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonRepository } from './lesson.repository';
import { roles } from 'src/common/enums/user_role.enum';
import { SubjectService } from '../subject/subject.service';
import { MarkService } from '../mark/mark.service';
import { questionType } from 'src/common/enums/question_type.enum';
import { MARKSTATE } from 'src/common/enums/mark_state.enum';
import { JwtPayload } from 'src/common/interfaces/jwt_payloda.interface';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonRepository) private readonly lessonRepo:LessonRepository,
    private readonly subjectService:SubjectService,
    private readonly markService:MarkService
  ){}
  
  async create(createLessonDto: CreateLessonDto,subjectId:number) {
    
    const maxNumber=await this.lessonRepo.getMaxNumber(subjectId);
    console.log(maxNumber)
    const lessonNumber=maxNumber.maxlessonnumber+1
    return await this.lessonRepo.createLesson(createLessonDto,subjectId,lessonNumber)
  }

  async findAll(subjectId:number,userId:number,role:roles) {
    const isExist=await this.subjectService.getUserSubject(userId,subjectId)
    if(!isExist && role =='user') throw new BadRequestException('you should subscribe to course first')
    return await this.lessonRepo.getAllLessonBySubject(subjectId)
  }

  async findOne(id: number,user?:JwtPayload) {
    const lesson = await this.lessonRepo.getLessonById(id)
    // console.log('36 user',user)
    
    if (!lesson ) throw new NotFoundException('this lesson is not found')
    if(user.role != 'user') return lesson
    if(lesson.lessonNumber == 1 ) return lesson
    
    const MarkState=await this.markService.getStudentMark(user.userId,id-1,questionType.LESSON)
    console.log(MarkState)
    if(!MarkState ||( user.role == 'user'&& MarkState.state == MARKSTATE.FAILED && lesson.lessonNumber != 1)) throw new BadRequestException('you should pass the back lesson')

    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto,user?:JwtPayload) {
    await this.findOne(id,user)
    return await this.lessonRepo.updateLesson(id,updateLessonDto)
  }

  async remove(id: number,user:JwtPayload) {
    const lesson=await this.findOne(id,user)

    const lessons=await this.lessonRepo.getLessonGt(lesson.subjectId,lesson.lessonNumber)
    
    // console.log("62",lessons)

    for(const l of lessons){
      await this.update(l.id,{lessonNumber:l.lessonNumber-1},user)
    }

    return await this.lessonRepo.deleteLesson(id)
  }
}
