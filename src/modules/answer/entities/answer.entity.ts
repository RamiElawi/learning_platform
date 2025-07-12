import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_Answer } from "./user_answer.entity";
import { Question } from "src/modules/question/entities/question.entity";

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    answer:string;


    @ManyToOne(()=>Question,question=>question.answers,{eager:true})
    question:Question
    @Column()
    questionId:number

    @OneToMany(()=>User_Answer,uanswer=>uanswer.answer,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    uanswer:User_Answer[]

    @OneToOne(()=>Question,question=>question,{eager:true})
    question1:Question
    

}
