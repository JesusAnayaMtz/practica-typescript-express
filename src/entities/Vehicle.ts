import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: "vehicles"})
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    brand: string

    @Column()
    color: string

    @Column()
    model: string

    @Column()
    year: number

    //establecemos la relacion de varios a uno para completar la relacion de que un usuario puedatener varios vehiculos
    @ManyToOne(() => User, (user) => user.vehicles)
    user: User
}