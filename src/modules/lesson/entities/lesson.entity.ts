
import { Subject } from "src/modules/subject/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('lesson')
export class Lesson {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    url:string;
    @Column({nullable:true})
    rate:string;
    @Column()
    description:string;
    @Column({nullable:true})
    lessonNumber:number;    

    @ManyToOne(()=>Subject,sub=>sub.lessons,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    subject:Subject
    @Column()
    subjectId:number;
   
}
