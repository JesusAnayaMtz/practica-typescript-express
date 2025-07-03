import { vehicleModel, userModel } from "../config/data-source"
import vehicleDto from "../dtos/vehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
    const vehicles = await vehicleModel.find({
        relations: {
            user: true
        }
    });
    return vehicles
}

export const createVehicleService = async (vehicle: vehicleDto): Promise<Vehicle> => {
    const newVehicle = await vehicleModel.create(vehicle);
    await vehicleModel.save(newVehicle);

    //Obtenemos el usuario al que se le agregara el vehiculo
    const user = await userModel.findOneBy({
        id: vehicle.userId
    })

    //validamos si tengo un usuario le agregamos el vehiculo
    if(user){
    newVehicle.user = user; //indicamos al vehiculo cual es el usuario al que pertenece
    vehicleModel.save(newVehicle); //guardamos el vehiculo en la base de datos
    }
    return newVehicle;
}