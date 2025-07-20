import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ChangeImage {
    @ApiProperty()
        @IsOptional()
        @IsString()
        @IsUrl({},{message:'image must be a valid URL'})
        image?:string
    
}
