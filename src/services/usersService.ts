import {userModel } from "../config/data-source";
import UserDto from "../dtos/UserDto";
import { User } from "../entities/User";
import IUser from "../interfaces/IUser"


let id: number = 2;
//Cambia el retorno de la promesa a en vez de una interface nos regresa la entidad User
export const getUsersService = async (): Promise<User[]> => {
    //obtenemos todos los usuarios desde la base de datos usando typeorm
     const users = await userModel.find(); 
     return users;
}

//creamos nuestra funcion para crear un usuario el cual es una funcion asincrona que recibe por parametros un objeto de tipo UserDto y retorna una promesa de tipo IUser
export const createUserService = async (userData: UserDto): Promise<User> => {
    const user = await userModel.create(userData);
    const userSave = await userModel.save(user)
    return userSave;
}

//Metodo para eliminar un usuario, el cual va recibir un id y filtrara para eliminarlo y nos retorna una promesa que no retorna nada
export const deleteUserService = async (id: number): Promise<void> => {
    await userModel.delete(id);
}

export const getUserByIdService = async(id: number):Promise<User> => {
    const user = await userModel.findOneBy({id});
    if(!user) {
        throw new Error("Usuario no encontrado")
    }
    return user;
}