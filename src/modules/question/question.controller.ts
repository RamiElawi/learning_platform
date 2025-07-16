import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { questionType } from 'src/common/enums/question_type.enum';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { AddMarkDto } from './dto/AddMarkDto.repository';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';

@ApiTags('question')
@ApiBearerAuth('accessToken')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthorizeGuard)
    @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Post('/:questionableType/:questionableId')
  async create(@Body() createQuestionDto: CreateQuestionDto,@Param('questionableType') questionableType:questionType,@Param('questionableId') questionableId:number) {
    return await this.questionService.create(createQuestionDto,questionableType,questionableId);
  }
  

  @Get('/:questionableType/:questionableId/getAllQuestion')
  async findAll(@Param('questionableType') questionableType:questionType,@Param('questionableId') questionableId:number ) {
    console.log(questionableType,questionableId)
    return await this.questionService.findAll(questionableId,questionableType);
  }
@UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Get('/getQuestion/:id')
  async findOne(@Param('id') id: number) {
    return await this.questionService.findOne(+id);
  }
@UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Patch('/updateQuestion/:id')
  async update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionService.update(+id, updateQuestionDto);
  }
@UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Delete('/deleteQuestion/:id')
  async remove(@Param('id') id: number) {
    return await this.questionService.remove(+id);
  }


  @Post('/userAnswer/addMark/:questionType/:questionableId')
  async addMark(@Body()addMarkDto:AddMarkDto,@Param('questionType') questionType:questionType,@Param('questionableId') questionableId:number,@CurrentUser()user){
    return await this.questionService.addMark(addMarkDto,questionType,user.userId,questionableId)
  }

   @UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN,roles.TEACHER)
  @Get('/getUserAnswers/:userId/:questionId/:questionType')
  async getUserAnswers(@Param('userId') userId:number,@Param('questionId') questionId:number,@Param('questionType') questionType:questionType){
    return await this.questionService.getUserAnswer(userId,questionId,questionType)
  }

}
