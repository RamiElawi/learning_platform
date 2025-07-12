import { Subject } from "src/modules/subject/entities/subject.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    

    @OneToMany(()=>User,user=>user.class,{eager:true})
    users:User[]

    @OneToMany(()=>Subject,sub=>sub.class,{eager:true})
    subjects:Subject[]
}
