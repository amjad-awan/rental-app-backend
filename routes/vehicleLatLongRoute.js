import  express  from "express";
import { addVehicleLatLongController, getSingleVehicleLatLongController, getVehicleLatLongController, updateVehicleLatLongController } from "../controllers/vehicleLatLongController.js";

const router= express.Router()

router.post("/add-latlong",addVehicleLatLongController)
router.put("/update-latlong/:latLongid",updateVehicleLatLongController)
router.get("/get-latlong",getVehicleLatLongController)
router.get("/get-vehiclelatlong/:vehicleId",getSingleVehicleLatLongController)

export default router