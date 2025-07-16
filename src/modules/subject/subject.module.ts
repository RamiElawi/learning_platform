import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';
import { UserSubject } from './entities/user_subject.entity';
import { UserSubjectRepository } from './user_subject.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Subject,UserSubject])],
  controllers: [SubjectController],
  providers: [SubjectService,SubjectRepository,UserSubjectRepository],
  exports:[SubjectService]

})
export class SubjectModule {}
