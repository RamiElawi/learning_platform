import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,10)
    @ApiProperty({example:'Back'})
    name:string;
}
