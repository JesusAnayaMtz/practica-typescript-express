import { Request, Response } from "express"
import { createUserService, getUsersService, deleteUserService } from "../services/usersService"
import IUser from "../interfaces/IUser";

export const getUsers = () => {

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

export const deleteUser = () => {

}