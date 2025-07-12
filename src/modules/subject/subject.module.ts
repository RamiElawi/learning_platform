import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './subject.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService,SubjectRepository],

})
export class SubjectModule {}
