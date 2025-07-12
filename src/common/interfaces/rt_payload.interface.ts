
import { JwtPayload } from "./jwt_payloda.interface";

export interface RT_JwtPayload extends JwtPayload{
    refreshToken:string
} 