import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AddStudentDto } from './dto/addStudentDto.dto';
import { FilterClassDto } from './dto/filterClassDto.dto';

@ApiBearerAuth('accessToken')
@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService
  ) {}

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Post('addClass')
  async create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }
  
  // @AuthorizeRoles(roles.ADMIN)
  // @UseGuards(AuthorizeGuard)
  // @Patch('/addStudentToClass/:classId')
  // async addStudentToClass(@Body() addStudentDto:AddStudentDto,@Param('classId')classId:number){
  //   return this.classService.addToClass(addStudentDto.userId,classId)
  // }

  @Post('/getAllClass')
  async findAll(@Body() filterClassDto:FilterClassDto) {
    return await this.classService.findAll(filterClassDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.classService.findOne(+id);
  }

  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return await this.classService.update(+id, updateClassDto);
  }
  
  
  @AuthorizeRoles(roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.classService.remove(+id);
  }
}
