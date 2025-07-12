import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/login.dto';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { gender } from "../../common/enums/user_gender.enum";
import { InjectRepository } from '@nestjs/typeorm';
import { roles } from 'src/common/enums/user_role.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../common/interfaces/jwt_payloda.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo:UserRepository,
    // @InjectRepository(ForgettenPasswordRepository) private readonly forgettenPasswordRepo:ForgettenPasswordRepository,
    private jwtService:JwtService,
    // private readonly nodeMailer:Nodemailer<NodemailerDrivers.SMTP>
  ){}
    
    
    async create(createUserDto: CreateUserDto) {
      const isExsist=await this.userRepo.findOneByEmail(createUserDto.email)
      
      if(isExsist) throw new HttpException('this email is already exsist',400)
      
      const hashPassword= await encodePassword(createUserDto.password)
  
    // console.log(hashPassword)
      const user={
        password:hashPassword,
        role:createUserDto.role??"user",
      }
      createUserDto=await Object.assign({...createUserDto,...user})
      
      //console.log(createUserDto)
      return await this.userRepo.insertUser(createUserDto)
      
    }
  
  
    async findAll(limit?:number,skip?:number,gender?:gender,age?:number,address?:string):Promise<User[]>{
      return  await this.userRepo.getUsers(limit,skip,gender,age,address) 
    }
  
    async findOne(userId: number):Promise<User> {
      const user=await this.userRepo.getUserById(userId)
      if(!user) throw new BadRequestException('this user is not found')
      return user;
    }
  
    async findUserByEmail(email:string):Promise<User>{
      console.log(email)
      const user=await this.userRepo.findOneByEmail(email)
      // console.log(user)
      if(!user) throw new BadRequestException('this user is not found')
      // delete user.password
      return user;
    } 
  
    async update(userId: number, updateUserDto: UpdateUserDto) {
        await this.findOne(userId)
        return await this.userRepo.updateUser(userId,updateUserDto)
      
    }
  
    async remove(userId: number) {
      await this.findOne(userId)
      return await this.userRepo.deleteUser(userId)
    }
  
    async getMe(userId:number){
      const user= await this.userRepo.getMe(userId)
      if(!user) throw new BadRequestException('this user is not found')
        return user;
    }
  
    async loginDto(loginDto:LogInDto){
      const user=await this.findUserByEmail(loginDto.email)
      console.log(user);
      const compare=await comparePassword(loginDto.password,user.password)
      if(!compare)
        throw new BadRequestException('unvalid request')
      delete user.password;
      const payload={email:user.email,role:user.role,userId:user.id}
      const tokens = await this.getTokens(user.id, user.role,user.email);
      return {tokens};
    }


  async getTokens(userId: number, role:roles,email: string) {
    const jwtPayload: JwtPayload = {
      email:email,
      role:role,
      userId:userId
    };

    const at=await this.jwtService.signAsync(jwtPayload, { 
      secret:process.env.SECRET_KEY_JWT,
      expiresIn: process.env.EXPIRES_IN,
    })

    return {
      access_token: at,
    };
  }
    
}
