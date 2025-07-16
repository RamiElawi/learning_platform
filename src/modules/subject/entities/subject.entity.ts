import { Class } from "src/modules/class/entities/class.entity";
import { Lesson } from "src/modules/lesson/entities/lesson.entity";
import { Mark } from "src/modules/mark/entities/mark.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserSubject } from "./user_subject.entity";

@Entity('subject')
export class Subject {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    image:string;


    @ManyToOne(()=>Class,clas=>clas.subjects,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    class:Class
    @Column()
    classId:number

    @OneToMany(()=>Lesson,lesson=>lesson.subject,{eager:true})
    lessons:Lesson[];

    @OneToMany(()=>UserSubject,userSubject=>userSubject.subject,{eager:true})
    userSubject:UserSubject[]

    
    
}
