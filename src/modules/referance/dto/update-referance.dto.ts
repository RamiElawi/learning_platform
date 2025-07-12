import { PartialType } from '@nestjs/mapped-types';
import { CreateReferanceDto } from './create-referance.dto';

export class UpdateReferanceDto extends PartialType(CreateReferanceDto) {}
