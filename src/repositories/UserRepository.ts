import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

//se le agrega el extend para poder agregar metodos
//aqui no se puede usar arrowfuntions ya que se maneja de otra forma el this
const UserRepository = AppDataSource.getRepository(User).extend({
    //Aqui crearemos metodo personalizado para nuestro Repository
    //en este caso creamos un metodo el cual busca el usuario por id valida que exista y si no retorna un error
    async findById(id: number): Promise<User> {
        const user = await this.findOneBy({id})
        if(user) return user;
        else throw Error("Invalid Id")
    },
    //creamos otra funcion personalizada la cual checa si el usuario existe pero solo retorna true o false
    async checkById(id: number): Promise<boolean> {
        const user = await this.findById(id);
        if(user) return true;
        else return false
    } 
})

export default UserRepository;