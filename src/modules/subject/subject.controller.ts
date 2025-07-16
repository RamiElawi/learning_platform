import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FilterSubjectDto } from './dto/filterSubjectDto.dot';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { UserSubjectDto } from './dto/createUserToSubject.dto';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';

@ApiBearerAuth('accessToken')
@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Post('/:classId/addSubject')
  async create(@Body() createSubjectDto: CreateSubjectDto,@Param('classId') classId:number) {
    return await this.subjectService.create(createSubjectDto,classId);
  }

  @Get('/:classId/getAllSubject')
  async findAll(@Param('classId') classId:number) {
    return this.subjectService.findAll(classId);
  }


  @Get('/getsubject/:id')
  async findOne(@Param('id') id: number) {
    return await this.subjectService.findOne(id);
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Patch('/updateSubject/:id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectService.update(+id, updateSubjectDto);
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Delete('/deleteSubject/:id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Post('/addUserToSubject')
  async addUsertoSubject(@Body() userSubjectDto:UserSubjectDto){
    return await this.subjectService.addUserToSubject(userSubjectDto.userId,userSubjectDto.subjectId)
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Delete('/deleteUserFromSubject')
  async deleteUserFromSubject(@Body()userSubjectDto:UserSubjectDto){
    return await this.subjectService.deleteUserFromSubject(userSubjectDto.userId,userSubjectDto.subjectId)
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Get('/getUserSubject/:subjectId')
  async getUserSubject(@Param('subjectId') subjectId:number){
    return await this.subjectService.getUserFromSubject(subjectId)
  }

}
