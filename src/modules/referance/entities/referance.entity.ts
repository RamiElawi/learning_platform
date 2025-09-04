import { User } from "../../../modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('referance')
export class Referance {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    link:string;


    @ManyToOne(()=>User,user=>user.referances,{onDelete:'SET NULL',onUpdate:'CASCADE'})
    user:User
    @Column()
    userId:number;

}
