import  express  from "express";
import { createUserController, loginUserController } from "../controllers/userController.js";

const router= express.Router()

router.post("/register-user", createUserController)
router.post("/login-user", loginUserController)


export default router