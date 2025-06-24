import server from "./server";
import { PORT } from "./config/envs"; //Importamos el puerto que viene del modulo envs.ts ya siendo una constante

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

