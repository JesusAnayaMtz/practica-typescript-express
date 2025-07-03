import server from "./server"; //importamos el servidor que viene de server.ts
import { PORT } from "./config/envs"; //Importamos el puerto que viene del modulo envs.ts ya siendo una constante
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

//Creamos una funcion asincrona que se encargue de inicializar la base de datos
AppDataSource.initialize().then(res => {
    console.log("Conexion a la base de datos realizada con exito")
    server.listen(PORT,() => {
        console.log(`Server running on port ${PORT}`);
    })
})

