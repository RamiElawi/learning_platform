
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    @ApiPropertyOptional({readOnly:true})
    answers?:undefined
    @ApiProperty()
    rightAnswer?:number
}
