import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ClassModule } from './modules/class/class.module';
import { SubjectModule } from './modules/subject/subject.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { ReferanceModule } from './modules/referance/referance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/dataSource';
import { CurrentUserMiddleware } from './middlewares/current_usre.middleware';
import { MarkModule } from './modules/mark/mark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption)
    ,UserModule
    ,ClassModule
    ,SubjectModule
    ,LessonModule
    ,QuestionModule
    ,AnswerModule
    ,ReferanceModule, MarkModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware)
    .exclude(
      'user/singup'
      ,'user/login'
    )
    .forRoutes({path:'*',method:RequestMethod.ALL})
  }
}
