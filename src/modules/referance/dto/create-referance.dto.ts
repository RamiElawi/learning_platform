import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReferanceDto {
    @ApiProperty()
    @IsString()
    name:string;
    @IsString()
    @ApiProperty()
    link:string;

}
