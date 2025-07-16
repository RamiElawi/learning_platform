import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty({example:['one','two','three']})
    answer:string[];
    @ApiProperty({example:'foure'})
    rightAnswer:string;
}
