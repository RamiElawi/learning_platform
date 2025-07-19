import { EntityRepository, Repository } from "typeorm";
import { Lesson } from "./entities/lesson.entity";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import dataSource from "db/dataSource";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { LessonService } from "./lesson.service";

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson>{
    
    async createLesson(createLessonDto:CreateLessonDto,subjectId:number,lessonNumber:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Lesson)
        .values({...createLessonDto,subjectId:subjectId,lessonNumber:lessonNumber})
        .execute()
    }

    async updateLesson(lessonId:number,updateLessonDto:UpdateLessonDto){
        return await dataSource
        .createQueryBuilder()
        .update(Lesson)
        .set({...updateLessonDto})
        .where('id = :lessonId',{lessonId:lessonId})
        .execute()
    }

    async deleteLesson(lessonId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Lesson)
        .where('id = :lessonId',{lessonId:lessonId})
        .execute()
    }

    async getAllLessonBySubject(subjectId:number){
        return await dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .where('lesson.subjectId = :subjectId',{subjectId:subjectId})
        .orderBy('lesson.lessonNumber','ASC')
        .getMany()
    }

    async getLessonById(lessonId:number){
        return await dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .where('lesson.id = :lessonId',{lessonId:lessonId})
        .getOne()
    }
    

    async getMaxNumber(subjectId:number){
        return await dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .select('MAX(lesson.lessonNumber)','maxlessonnumber')
        .where('lesson.subjectId = :subjectId' ,{subjectId:subjectId})
        .getRawOne()
    }

    async getLessonGt(subjectId:number,lessonNumber:number){
        return await dataSource
        .getRepository(Lesson)
        .createQueryBuilder('lesson')
        .where('lesson.subjectId = :subjectId',{subjectId:subjectId})
        .andWhere('lesson.lessonNumber > :lessonNumber',{lessonNumber:lessonNumber})
        .getMany()
    }
}