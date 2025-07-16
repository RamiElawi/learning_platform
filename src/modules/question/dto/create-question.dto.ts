import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { questionType } from "src/common/enums/question_type.enum";
import { CreateAnswerDto } from "src/modules/answer/dto/create-answer.dto";

export class CreateQuestionDto {
    @ApiProperty({example:'first question'})
    @IsString()
    title:string
    @ApiProperty({example:10})
    mark:number
    @ApiProperty()
    answers:CreateAnswerDto

}
