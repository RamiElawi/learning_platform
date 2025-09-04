import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { roles } from "../../../common/enums/user_role.enum";

export class ChangeRole{
    @IsNotEmpty()
    @IsEnum(roles)
    @ApiProperty({enum:roles})
    role:roles
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    userId:number
}