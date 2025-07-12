import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const allowedRoles=this.reflector.get<string[]>('roles',context.getHandler())
        const request= context.switchToHttp().getRequest()
        // console.log(request)
        const result= request?.CurrentUser?.role
        console.log("allowed",allowedRoles)
        console.log("result",result)
        if(allowedRoles.includes(result)) return true
        throw new UnauthorizedException("you don't have authorization to access this route. ")
    }
}