import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity('userAnswer')
export class User_Answer {
    @PrimaryGeneratedColumn()
    id:number;  



    @ManyToOne(()=>User,user=>user.uanswer,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    user:User
    @Column()
    userId:number
    @ManyToOne(()=>Answer,answer=>answer.uanswer,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    answer:Answer
    @Column()
    answerId:number
}
