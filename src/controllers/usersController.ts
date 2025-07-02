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
    const {name, email,age, active} = req.body;
    //creamos un objeto del tipo IUser con los datos del body
    const newUser: IUser = await createUserService({name, email, age, active});
    //retornamos el objeto creado con status 201 que es que se creo correctamente
    res.status(201).json(newUser);
}

//metodo para deliminar un usuario el cual por medio del cuerpo del json se le pasara el id y se eliminara el usuario con ese id
export const deleteUser = async (req: Request, res:Response) => {
    const {id} = req.body; //destruturamos el id del body
    await deleteUserService(id); //eliminamos el usuario con el id que nos llega del body
    res.status(200).json({message: "Usuario eliminado correctamente", id}); //retornamos un mensaje que el usuario se elimino correctamente y el id del usuario que se elimino
}