import { Router } from "express"; //importamos el router que viene con express
import { createUser, deleteUser, getUserById, getUsers } from "../controllers/usersController"; //importamos los controladores de los usuarios que vienen de usersController.ts
import auth from "../middlewares/auth";
import { getUserByIdService } from "../services/usersService";
import { createVehicle, getVehicles } from "../controllers/vehicleController";

//creamos una constante router que va a ser igual a Router() que viene con express
const router: Router = Router();

//agregamos las rutas que vamos a usar
//en este caso vamos a usar las rutas /users que vienen de usersController.ts
//y le pasamos como parametro la funcion getUsers que viene de usersController.ts
router.get("/users", getUsers)
router.post("/users",  createUser)
router.delete("/users", deleteUser)
router.get("/users/:id", getUserById)
router.get("/vehicles", getVehicles)
router.post("/vehicles", createVehicle)

//exportamos el router para que pueda ser usado en otros archivos
export default router;
