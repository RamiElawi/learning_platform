import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { questionType } from 'src/common/enums/question_type.enum';

@ApiTags('question')
@ApiBearerAuth('accessToken')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/:questionableType/:questionableId')
  async create(@Body() createQuestionDto: CreateQuestionDto,@Param('questionableType') questionableType:questionType,@Param('questionableId') questionableId:number) {
    return await this.questionService.create(createQuestionDto,questionableType,questionableId);
  }
  

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
