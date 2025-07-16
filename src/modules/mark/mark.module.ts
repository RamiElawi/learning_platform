import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { MarkRepository } from './mark.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Mark])],
  controllers: [MarkController],
  providers: [MarkService,MarkRepository],
  exports:[MarkService]
})
export class MarkModule {}
