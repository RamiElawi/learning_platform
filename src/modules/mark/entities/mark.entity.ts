import { MARKSTATE } from "src/common/enums/mark_state.enum";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mark')
export class Mark {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    mark:number;
    @Column({type:'enum',enum:MARKSTATE})
    state:MARKSTATE


    @ManyToOne(()=>User,user=>user.marks,{eager:true})
    user:User;
    @Column()
    userId:number
    @ManyToOne(()=>Subject,sub=>sub.marks,{eager:true})
    subject:Subject;
    @Column()
    subjectId:number


}
