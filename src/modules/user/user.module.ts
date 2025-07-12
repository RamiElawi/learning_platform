import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt_strategy';
import { UserRepository } from './user.repository';

@Module({
  imports:[PassportModule.register({
      defaultStrategy:['jwt']
    })
    ,JwtModule.register({}),
    TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserRepository,],
  exports:[
    JwtModule,
    PassportModule,
    UserRepository,
    UserService
  ]
  
})
export class UserModule {}
