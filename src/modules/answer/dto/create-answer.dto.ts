import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty()
    answer:string[];
    @ApiProperty()
    rightAnswer:string;
}
