import server from "./server"; //importamos el servidor que viene de server.ts
import { PORT } from "./config/envs"; //Importamos el puerto que viene del modulo envs.ts ya siendo una constante

//inicializamos el servidor en el puerto que viene de las variables de entorno
//y le pasamos una callback que se ejecutara cuando el servidor se inicie
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

