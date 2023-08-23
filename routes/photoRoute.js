import  express  from "express";
import { photoController } from "../controllers/photoController.js";


const router= express.Router()

router.post("/upload-photo", photoController)


export default router