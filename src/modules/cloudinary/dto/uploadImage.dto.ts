import { UploadedFiles } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class UploadImageDto {
    @ApiProperty({
      description: 'Image Datas',
      format: 'binary',
    })
    file: Express.Multer.File[];
  }