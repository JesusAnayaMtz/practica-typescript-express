import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Vehicle } from "../entities/Vehicle";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1989Iscj.",
    database: "demo_typeorm",
    //dropSchema: true,  //sirve para eliminar limpiar la base de datos
    synchronize: true,
    logging: false,
    entities: [User, Vehicle],
    subscribers: [],
    migrations: [],
})

export const userModel = AppDataSource.getRepository(User);
export const vehicleModel = AppDataSource.getRepository(Vehicle);