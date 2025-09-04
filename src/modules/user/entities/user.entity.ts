import { isNotEmpty } from "class-validator";
import { gender } from "../../../common/enums/user_gender.enum";
import { roles } from "../../../common/enums/user_role.enum";
import { User_Answer } from "../../../modules/answer/entities/user_answer.entity";
import { Class } from "../../../modules/class/entities/class.entity";
import { Mark } from "../../../modules/mark/entities/mark.entity";
import { Referance } from "../../../modules/referance/entities/referance.entity";
import { UserSubject } from "../../../modules/subject/entities/user_subject.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
@Unique(['email'])

export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    firstName:string;
    @Column({nullable:true})
    lastName:string;
    @Column()
    email:string;
    @Column({select:false})
    password:string;
    @Column({type:'enum',enum:roles,default:roles.USER})
    role:roles;
    @Column({nullable:true})
    image:string;
    @Column({nullable:true,type:'date'})
    birthDate:string;
    @Column()
    phoneNumber:string;
    @Column({nullable:true})
    Address:string;
    @Column({type:'enum',enum:gender})
    gender:gender
    @Column({default:() => "CURRENT_TIMESTAMP"})
    timestamps:Date


    // @ManyToOne(()=>Class,clas=>clas.users,{onDelete:'SET NULL',onUpdate:'CASCADE'})
    // class:Class
    // @Column({nullable:true})
    // classId:number

    @OneToMany(()=>Mark,mark=>mark.user,{eager:true})
    marks:Mark[]

    @OneToMany(()=>UserSubject,userSubject=>userSubject.user,{eager:true})
    userSubject:UserSubject[]

    
    @OneToMany(()=>Referance,ref=>ref.user,{eager:true})
    referances:Referance[]

    @OneToMany(()=>User_Answer,uanswer=>uanswer.user,{eager:true})
    uanswer:User_Answer[]


}
