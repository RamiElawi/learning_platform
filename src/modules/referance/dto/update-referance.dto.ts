
import { PartialType } from '@nestjs/swagger';
import { CreateReferanceDto } from './create-referance.dto';

export class UpdateReferanceDto extends PartialType(CreateReferanceDto) {}
