import * as bcrypt from 'bcryptjs'

export const encodePassword=(password:string)=>{
    return bcrypt.hashSync(password)
}

export const comparePassword=(password:string,hashPassword:string)=>{
    return bcrypt.compareSync(password,hashPassword)
}