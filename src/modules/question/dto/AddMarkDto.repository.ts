import { ApiProperty } from "@nestjs/swagger";

export class AddMarkDto{
    @ApiProperty({example:[{questionId:14,answer:7},{questionId:15,answer:12}]})
    answer:string[]
}