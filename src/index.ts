import server from "./server"; //importamos el servidor que viene de server.ts
import { PORT } from "./config/envs"; //Importamos el puerto que viene del modulo envs.ts ya siendo una constante
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";
import {  preloadUserData, preloadVehiclesData } from "./helpers/preloadData";

//Creamos una funcion asincrona que se encargue de inicializar la base de datos
/* AppDataSource.initialize().then(res => {
    console.log("Conexion a la base de datos realizada con exito")
    preloadUserData().then(res => { //res es el resultado de la precarga de datos, al ser una prkmesa se le puede encadenar el server
        server.listen(PORT,() => { //se ejecuta el servidor
        console.log(`Server running on port ${PORT}`);
    })
    })
}) */

const initializeApp = async () => {
    await AppDataSource.initialize()
    await preloadUserData()
    await preloadVehiclesData()
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

initializeApp()
