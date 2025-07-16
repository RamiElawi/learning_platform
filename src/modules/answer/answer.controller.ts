import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { questionType } from 'src/common/enums/question_type.enum';

@ApiTags('answer')
@ApiBearerAuth('accessToken')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}


  @Get('/getAllAnswer/:questionId')
  async findAll(@Param('questionId') questionId:number) {
    return this.answerService.findAll(questionId);
  }
@UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Get('/getAnswer/:id')
  async findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Patch('/updateAnswer/:answerId')
  async update(@Param('answerId') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id,updateAnswerDto.answer)
  }
@UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Delete('/deleteAnswer/:id')
  async remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }

  // @UseGuards(AuthorizeGuard)
  // @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  // @Get('/getUserAnswers/:userId/:questionId/:questionType')
  // async getUserAnswers(@Param('userId') userId:number,@Param('questionId') questionId:number,@Param('questionType') questionType:questionType){
  //   return await this.answerService.getUserAnswer(userId,questionId,questionType)
  // }
}
