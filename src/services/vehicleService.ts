import {AppDataSource } from "../config/data-source"
import VehicleRepository from "../repositories/VehicleRepository";
import UserRepository from "../repositories/userRepository";
import vehicleDto from "../dtos/vehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
    const vehicles = await VehicleRepository.find({
        relations: {
            user: true
        }
    });
    return vehicles
}

export const createVehicleService = async (vehicle: vehicleDto): Promise<Vehicle | void> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        queryRunner.startTransaction();

        const newVehicle = await VehicleRepository.create(vehicle);
        await queryRunner.manager.save(newVehicle);

        const user = await UserRepository.findOneBy({ id: vehicle.userId })
        if (!user) {
            throw Error("Usuario inexistente: No se a podido crear el vehiculo")
        }

        newVehicle.user = user;
        await queryRunner.manager.save(newVehicle);

        await queryRunner.commitTransaction();

        return newVehicle;
    } catch(error) {
        await queryRunner.rollbackTransaction();
        throw Error("Usuario inexistente")
    } finally {
        await queryRunner.release();
    }
}