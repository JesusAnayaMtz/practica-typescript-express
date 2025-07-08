
import { AppDataSource} from "../config/data-source";
import UserRepository from "../repositories/UserRepository";
import VehicleRepository from "../repositories/VehicleRepository";

//creamos un arreglo de usuarios
const preLoadUsers = [
    {
        name: "Jesus",
        email: "jesus@prueba.com",
        age: 35,
        active: true
    },
    {
        name: "Jose",
        email: "jose@prueba.com",
        age: 30,
        active: true
    },
    {
        name: "Antonio",
        email: "antonio@prueba.com",
        age: 28,
        active: true
    },
    {
        name: "Marco",
        email: "marcoesus@prueba.com",
        age: 40,
        active: true
    }

]

const preLoadVehicles = [
    {
        brand: "Toyota",
        color: "Blue",
        model: "Corolla",
        year: 2020,
        userId: 1
    },
    {
        brand: "Nissan",
        color: "Red",
        model: "Versa",
        year: 2021,
        userId: 2
    },
    {
        brand: "Ford",
        color: "Gray",
        model: "Lobo",
        year: 2023,
        userId: 3
    },
    {
        brand: "Chevrolet",
        color: "White",
        model: "Cavalier",
        year: 2020,
        userId: 4
    }
]

export const preloadUserData = async () => {
    //implementamos el appDataSource para trabajar con transacciones
    //el manager se encarga de manejar las transacciones
    //el transactionalEntityManager es el que se encarga de ejecutar las transacciones
    //siempre se debe usar el transactionalEntityManager para ejecutar las transacciones
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        //primero vamos a validar que la base de datos este vacia usando el transactionalEntityManager
        const users = await UserRepository.find();
        if (users.length > 0) {
            console.log("La base de datos ya tiene datos");
            return;
        }

        //el for await nos permite esperar operaciones asincronas
        //con este for creamos los usuarios que viene de nuestr arreglo de users
        for await (const user of preLoadUsers) {
            const newUser = await UserRepository.create(user)
            await transactionalEntityManager.save(newUser);
        }
        console.log("Precarga de datos de usuarios realizada con exito")
    })
}

//se genera otra funncion para precargar los vehiculos
export const preloadVehiclesData = async () => {
    const queryRunner = AppDataSource.createQueryRunner(); // Crea un queryRunner
    await queryRunner.connect(); // Conecta el queryRunner a la base de datos
    await queryRunner.startTransaction(); // Iniciar la transacción antes de hacer cualquier operación

    try {
        //ciclo for para precargar los vehiculos
        for (const vehicle of preLoadVehicles) {
            const user = await UserRepository.findOneBy({ id: vehicle.userId });
            if (!user) {
                throw new Error(`Usuario con ID ${vehicle.userId} no existe`);
            }

            //creamos el vehiculo
            const newVehicle = VehicleRepository.create(vehicle);
            newVehicle.user = user; // Asociamos el usuario al vehiculo
            await queryRunner.manager.save(newVehicle); // luego guardamos
        }

        await queryRunner.commitTransaction(); // Confirmamos la transacción
        console.log("Precarga de vehículos realizada con éxito");
    } catch (error) {
        console.error("Error al intentar crear los vehículos:", error);
        await queryRunner.rollbackTransaction(); // Revertimos la transacción en caso de error
    } finally {
        await queryRunner.release(); // Liberamos el queryRunner
        console.log("Finalizó el intento de la precarga");
    }
}