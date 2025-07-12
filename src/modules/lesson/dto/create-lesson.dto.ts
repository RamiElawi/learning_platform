import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @ApiProperty({example:'functions'})
    name:string;
    @IsUrl()    
    @ApiProperty({example:'https://www.youtube.com/watch?v=BAx0LI6NnNg'})
    url:string;
    @IsString()
    @ApiProperty({example:'this lesson explane functions'})
    description:string;
}
