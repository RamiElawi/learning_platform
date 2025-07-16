import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/entities/user.entity";
import { UserService } from "../modules/user/user.service";
import { Repository } from "typeorm";


declare global{
    namespace Express{
        interface Request{
            CurrentUser?:User
        }
    }
}

config()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(@Inject(UserService) private readonly userService: UserService){}
    async use(req:Request,res:Response,next:NextFunction){
        const authHeader=req.get('Authorization')
        if(!authHeader){
            req.CurrentUser=null;
            console.log("here1")
            throw new UnauthorizedException()
        } 
        try{
            const token= authHeader.split(' ')[1]
            const {email,userId,role}=<JwtPayload>verify(token,process.env.SECRET_KEY_JWT)
            const user=await this.userService.findUserByEmail(email)
            delete user.password;
            const payload={email,userId,role}
            req.CurrentUser=payload
        }catch(err){
            console.log(err)
            console.log("here2")
            req.CurrentUser=null;
            throw new UnauthorizedException()
        }
        next()
    }
}