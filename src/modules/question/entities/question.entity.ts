import { questionType } from "../../../common/enums/question_type.enum";
import { Answer } from "../../../modules/answer/entities/answer.entity";
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


    @OneToMany(()=>Answer,answer=>answer.question,{eager:true})
    answers:Answer[]
    @OneToOne(()=>Answer,answer=>answer.question1,{eager:true})
    answer:Answer;
    @Column({nullable:true})
    rightAnswer:number


}
