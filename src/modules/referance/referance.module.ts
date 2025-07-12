import { Module } from '@nestjs/common';
import { ReferanceService } from './referance.service';
import { ReferanceController } from './referance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referance } from './entities/referance.entity';
import { ReferanceRepository } from './referance.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Referance])],
  controllers: [ReferanceController],
  providers: [ReferanceService,ReferanceRepository],
})
export class ReferanceModule {}
