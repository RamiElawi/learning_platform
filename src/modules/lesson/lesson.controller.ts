import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';

@ApiBearerAuth('accessToken')
@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}


  @AuthorizeRoles(roles.TEACHER,roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Post('/:subjectId/addLessson')
  async create(@Body() createLessonDto: CreateLessonDto,@Param('subjectId') subjectId:number) {
    return await this.lessonService.create(createLessonDto,subjectId);
  }

  @Get('/:subjectId/getAllLesson')
  async findAll(@Param('subjectId') subjectId:number) {
    return await this.lessonService.findAll(subjectId);
  }

  @Get('/getLesson/:id')
  async findOne(@Param('id') id:number) {
    return await this.lessonService.findOne(id);
  }

  @AuthorizeRoles(roles.TEACHER,roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Patch('/updateLesson/:id')
  async update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto) {
    return await this.lessonService.update(id, updateLessonDto);
  }
  
  @AuthorizeRoles(roles.TEACHER,roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Delete('/deleteLesson/:id')
  async remove(@Param('id') id: number) {
    return await this.lessonService.remove(id);
  }
}
