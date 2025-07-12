import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReferanceService } from './referance.service';
import { CreateReferanceDto } from './dto/create-referance.dto';
import { UpdateReferanceDto } from './dto/update-referance.dto';
import { FilterReferanceDto } from './dto/filterReferanceDto.dto';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';

@ApiTags('referance')
@ApiBearerAuth('accessToken')
@Controller('referance')
export class ReferanceController {
  constructor(private readonly referanceService: ReferanceService) {}

  @AuthorizeRoles(roles.TEACHER,roles.ADMIN)
  @UseGuards(AuthorizeGuard)
  @Post()
  async create(@Body() createReferanceDto: CreateReferanceDto,@CurrentUser() userId) {
    console.log(userId)
    return this.referanceService.create(createReferanceDto,userId);
  }

  @Get()
  findAll(filterReferanceDto:FilterReferanceDto) {
    return this.referanceService.findAll(filterReferanceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.referanceService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReferanceDto: UpdateReferanceDto) {
    return this.referanceService.update(id, updateReferanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referanceService.remove(+id);
  }
}
