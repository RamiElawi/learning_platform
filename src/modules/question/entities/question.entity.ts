import { questionType } from "src/common/enums/question_type.enum";
import { Answer } from "src/modules/answer/entities/answer.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string
    @Column()
    questionableId:number;
    @Column({type:'enum',enum:questionType})
    questionableType:questionType
    @Column()
    mark:number


    @OneToMany(()=>Answer,answer=>answer.question,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    answers:Answer[]
    @OneToOne(()=>Answer,answer=>answer.question1,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    answer:Answer;
    @Column({nullable:true})
    rightAnswer:number


}
