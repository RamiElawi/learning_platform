import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl, Length, Max, Min } from "class-validator";
import { Match } from "../../../common/decorator/match.decorator";
import { gender } from "../../../common/enums/user_gender.enum";
import { roles } from "../../../common/enums/user_role.enum";
import { Transform, Type } from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString({message:'first name should be string'})
    @Length(3,30,{message:'you should enter name between 3 and 30'})
    @ApiProperty({example:'rami'})
    firstName:string;
    @IsNotEmpty()
    @IsString({message:'last name should be string'})
    @Length(3,30,{message:'you should enter name between 3 and 30'})
    @ApiProperty({example:'elawi'})
    lastName:string;
    
    //email
    @ApiProperty({example:'rami1@gmail.com'})
    @IsNotEmpty()
    @IsEmail({},{message:'email is not valid'})
    email:string;
    
    //password
    @ApiProperty({example:"Abed@1234"})
    @Length(8,30,{message:'you should enter password between 8 and 30'})
    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    password:string;
    
    @ApiProperty({example:"Abed@1234"})
    @IsString()
    @Length(8,30,{message:'you should enter password between 8 and 30'})
    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    @Match('password',{message:'this password is not match'})
    confirmPassword?:string
    //role
    @IsOptional()
    @ApiProperty({enum:roles,example:roles.USER})
    role?:roles
    
    //avater
    @ApiProperty()
    // @IsOptional()
    // @IsString()
    // @IsUrl({},{message:'image must be a valid URL'})
    image?:string
    
    //age
    @ApiProperty({example:'2002-01-01'})
    @IsNotEmpty({message:'this field is require'})
    @IsDateString()
    birthDate:string;
    
    //phone
    @ApiProperty({example:"+963982269417"})
    @IsPhoneNumber('SY',{message:'phone number should begain +963'})
    phoneNumber:string;
    
    //address
    @ApiProperty({example:'dear alzour'})
    @IsString({message:'address should be string '})
    @IsOptional()
    Address:string;
    
    //gender
    @ApiProperty({enum:gender,example:gender.MALE})
    @IsNotEmpty()
    @IsEnum(gender,{message:'gender must be male or female'})
    gender:gender
}
