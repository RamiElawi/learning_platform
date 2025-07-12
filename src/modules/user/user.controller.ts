import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/common/guard/user_auth.guard';
import { AuthorizeRoles } from 'src/common/decorator/authorize_role.decorator';
import { roles } from 'src/common/enums/user_role.enum';
import { ChangeRole } from './dto/changeRole.dto';


@ApiBearerAuth('accessToken')
@ApiTags('user')
@Controller('user')
export class UserController {
  
  constructor(private readonly userSrevice:UserService){}
  
  @Post('/singup')
  async signUp(@Body() createUserDto:CreateUserDto){
    return await this.userSrevice.create(createUserDto)
  }
  
  @Post('/login')
  async logIn(@Body() loginDto:LogInDto){
    const login=await this.userSrevice.loginDto(loginDto)
    return {token:login.tokens.access_token}
  }

  
 @Get("getMe")
  async getMe(@Req() req:Request){
    //@ts-ignore
    const userId=req.CurrentUser.userId
    return await this.userSrevice.getMe(userId)
  }

  @UseGuards(AuthorizeGuard)
  @AuthorizeRoles(roles.ADMIN)
  @Patch('/changeRole')
  async changeRole(@Body() changeRoleDto:ChangeRole){
    return await this.userSrevice.update(changeRoleDto.userId,{role:changeRoleDto.role})
  }
}
