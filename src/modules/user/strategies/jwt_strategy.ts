import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../../common/interfaces/jwt_payloda.interface";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";


config()

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.SECRET_KEY_JWT
        })
    }


    async validate(payload:JwtPayload):Promise<User>{
        const {email,userId,role}=payload
         const user=await this.userService.findUserByEmail(email)
        if(!user) throw new UnauthorizedException('user is not authourized')
        delete user.password;
        return user
    }
}