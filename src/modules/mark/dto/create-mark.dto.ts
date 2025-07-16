import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { MARKSTATE } from "src/common/enums/mark_state.enum";
import { questionType } from "src/common/enums/question_type.enum";

export class CreateMarkDto {
    @ApiProperty()
    @IsNumber()
    mark:number;
    @IsEnum({enum:MARKSTATE})
    @ApiProperty()
    state:MARKSTATE
    @IsNumber()
    @ApiProperty()
    markableId:number;
    @ApiProperty()
    @IsEnum({enum:questionType})
    markableType:questionType
    @ApiProperty()
    @IsNumber()
    userId:number
}
