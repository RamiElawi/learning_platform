import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { UserModule } from '../user/user.module';
import { ClassRepository } from './class.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Class]),UserModule],
  controllers: [ClassController],
  providers: [ClassService,ClassRepository],
})
export class ClassModule {}
