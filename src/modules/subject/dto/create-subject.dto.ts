import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'math'})
    name:string;    
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({example:'https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fwww.bigfootdigital.co.uk%2Fwp-content%2Fuploads%2F2020%2F07%2Fimage-optimisation-scaled.jpg&imgrefurl=https%3A%2F%2Fwww.bigfootdigital.co.uk%2Fhow-to-optimise-images&docid=dTbNgrJF6xXg5M&tbnid=s_UYcOUl07ucGM&vet=12ahUKEwiB9bO2pKWOAxUE_rsIHYOjLJUQM3oECGYQAA..i&w=2560&h=1707&hcb=2&ved=2ahUKEwiB9bO2pKWOAxUE_rsIHYOjLJUQM3oECGYQAA'})
    image:string;
}
