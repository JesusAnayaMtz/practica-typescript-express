import { Request, Response } from "express" //importamos los tipos Request y Response que vienen con express
import { createUserService, getUsersService, deleteUserService } from "../services/usersService" //importamos los servicios de los usuarios que vienen de usersService.ts
import IUser from "../interfaces/IUser"; //importamos la interfaz IUser que viene de IUser.ts para que el controller pueda usar los datos que vienen del body

//creamos el metodo getusers para obtener los usuarios 
export const getUsers = async (req: Request, res:Response) => {
    try {
        const users: IUser[] = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error al obtener los usuarios", error});
    }
}

//en el controller de crear usuarios le pasamos por parametros req que es del tipo Request y res que es del tipo Response pero de express
export const createUser = async (req:Request , res: Response) => {
    //destruturamos los datos del usuario que vienen del body
    const {name, email, active} = req.body;
    //creamos un objeto del tipo IUser con los datos del body
    const newUser: IUser = await createUserService({name, email, active});
    //retornamos el objeto creado con status 201 que es que se creo correctamente
    res.status(201).json(newUser);
}

//metodo para deliminar un usuario
export const deleteUser = () => {

}