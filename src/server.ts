import express from "express"
import router from "./routes"

//inicializamos una variable para el servidor
const server = express();

//con use podemos usar middlewares que son funciones que se ejecutan antes de que se ejecute la ruta en este caso usamos express.json
//el cual nos ayuda a que el servidor pueda entender los datos que le enviamos en el body de la peticion
server.use(express.json())

//ahora agregamos el router que viene con express para que el servidor pueda entender las rutas que le enviamos
server.use(router)

//exportamos el servidor para que pueda ser usado en otros archivos
export default server;
