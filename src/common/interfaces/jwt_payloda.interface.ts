import { roles } from "../enums/user_role.enum";

export interface JwtPayload{
    email:string;
    role:roles;
    userId:number;
}