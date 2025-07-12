// app.controller.ts
import {
    Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { UploadImageDto } from './dto/uploadImage.dto';

@ApiTags('uploadImage')
// @ApiBearerAuth('accessToken')
@Controller('image')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}


  @Post('upload')
    //  @UseGuards(AuthorizeGuard)
    // @AuthorizeRoles(roles.ADMIN,roles.USER,roles.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Body() uploadImage:UploadImageDto,@UploadedFile() file:Express.Multer.File) {
    console.log(file)
    return {url:(await this.cloudinaryService.uploadFile(file)).url}
  }
}
