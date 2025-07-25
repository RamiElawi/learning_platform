import { MARKSTATE } from "src/common/enums/mark_state.enum";
import { questionType } from "src/common/enums/question_type.enum";
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
    @Column({nullable:true})
    markableId:number;
    @Column({nullable:true})
    markableType:questionType


    @ManyToOne(()=>User,user=>user.marks,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    user:User;
    @Column()
    userId:number


}
