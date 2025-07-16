import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { questionType } from 'src/common/enums/question_type.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';

@ApiTags('mark')
@ApiBearerAuth('accessToken')
@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Get('/getAllMark/:markableId/:markableType')
  findAll(@Param('markableId') markableId:number,@Param('markableType')markableType:questionType) {
    return this.markService.findAll(markableId,markableType);
  }


  @UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Patch('/updateMark/:id')
  update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return this.markService.update(+id, updateMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markService.remove(+id);
  }
}
