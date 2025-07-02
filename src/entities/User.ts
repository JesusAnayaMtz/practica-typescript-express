import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

//Creamos nuestra clase
//ahora debemos hacer pasar esta clase como un decorador
//lo que haces es cambiar nuestra clase y convertirla en una entidad de orm
//el decorador tiene unas propiedades que lo que hara sera convertir nuestra orpiedades de la clase en columnas para el uso en postgres
//el decorador es una funcion y de esta forma ya la convertimos en una entidad 
// asi mismo este entity nos creara una tabla con el nombre de users si no se lo colocamos la crearria con el nombre de user
@Entity({name: "users"})  
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column()
    email: string

    @Column("integer")
    age: number

    @Column()
    active: boolean
}



