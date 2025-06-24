import UserDto from "../dtos/UserDto";
import IUser from "../interfaces/IUser"

const users: IUser[] = []

let id: number = 1;

export const getUsersService = async () => {
}

//creamos nuestra funcion para crear un usuario el cual es una funcion asincrona que recibe por parametros un objeto de tipo UserDto y retorna una promesa de tipo IUser
export const createUserService = async (userData: UserDto): Promise<IUser>  => {
    //creamos un nuevo usuario del tipo IUser con los datos del objeto userData que es del tipo UserDto
    const newUser: IUser = {
        id,
        name: userData.name,
        email: userData.email,
        active: userData.active
    }
    //agregarlo al arreglo de users
    users.push(newUser);
    id++;
    //retornamos el objeto
    return newUser;
}

export const deleteUserService = async () => {

}