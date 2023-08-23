import  express  from "express";
import { addUsereLatLongController, getUserLatLongController } from "../controllers/userLatLongController.js";

const router= express.Router()

router.post("/add-userlatlong",addUsereLatLongController)
router.get("/get-userlatlong/:userId",getUserLatLongController)


export default router