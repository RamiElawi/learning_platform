import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_Answer } from "./user_answer.entity";
import { Question } from "../../../modules/question/entities/question.entity";

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    answer:string;


    @ManyToOne(()=>Question,question=>question.answers,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    question:Question
    @Column()
    questionId:number

    @OneToMany(()=>User_Answer,uanswer=>uanswer.answer)
    uanswer:User_Answer[]

    @OneToOne(()=>Question,question=>question,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    question1:Question
    

}
