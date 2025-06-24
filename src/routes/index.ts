import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/usersController";

const router: Router = Router();

router.get("/users", getUsers)
router.post("/users", createUser)
router.delete("/users", deleteUser)

export default router;