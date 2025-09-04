import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator"

export class LogInDto{
    @ApiProperty({example:'rami1@gmail.com'})
    @IsNotEmpty()
    @IsEmail({},{message:'email is not valid'})
    email:string
    @ApiProperty({example:"Abed@1234"})
    @Length(8,30,{message:'you should enter password between 3 and 20'})
    password:string

}