import { config } from 'dotenv';
import { UserService } from '../../src/modules/user/user.service';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../src/modules/user/entities/user.entity';
import { encodePassword } from '../../src/utils/bcrypt';
import { roles } from '../../src/common/enums/user_role.enum';
import { gender } from '../../src/common/enums/user_gender.enum';

config()
export class User1756980211699 implements Seeder {
    track = false;

    constructor(private readonly userService:UserService){}

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // console.log('rsami seed in new one ')
        // console.log(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)
        const hashPassword= await encodePassword(process.env.ADMIN_PASSWORD)
        // console.log(hashPassword)
        const repository =  dataSource.getRepository(User);

        const isExsist= await repository.findOne({where:{email:process.env.ADMIN_EMAIL}})
        console.log(isExsist)
        if(isExsist){
            console.log('this email is already exsist')
            return ;
        }
        await repository.insert([
            {
                firstName: 'admin',
                lastName: 'admin',
                email: process.env.ADMIN_EMAIL,
                password:hashPassword,
                role:roles.ADMIN,
                phoneNumber:'0999999999',
                gender:gender.MALE
            }
        ]);
        console.log('done')
        return;
    }
}
