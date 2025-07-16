
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subject.entity";


@Entity('userSubject')
export class UserSubject{
    @PrimaryGeneratedColumn()
    id:number
    

    @ManyToOne(()=>User,user=>user.userSubject,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    user:User
    @Column()
    userId:number

    @ManyToOne(()=>Subject,subject=>subject.userSubject,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    subject:Subject
    @Column()
    subjectId:number

}
