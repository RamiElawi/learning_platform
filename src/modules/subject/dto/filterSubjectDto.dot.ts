import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class FilterSubjectDto{
    @IsNumber()
    @ApiProperty()
    limit:number
    @IsNumber()
    @ApiProperty()
    skip:number
}