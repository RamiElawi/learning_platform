import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddStudentDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    userId:number
}