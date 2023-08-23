import express from "express";
import {
  addVehicleController,
  getFilteredByModalVehiclesController,
  getFilteredVehiclesController,
  getPriceFilteredVehiclesController,
  getSingleVehiclesController,
  getVehicleController,
  updateVehiclesController,
} from "../controllers/vehcileController.js";

const router = express.Router();
//add vehcile
router.post("/add", addVehicleController);
//get vehicles
router.get("/get-vehicles", getVehicleController);
// get single vehicle 
router.get("/get-vehicle/:vehiclid", getSingleVehiclesController);
// update vehicle route 
router.put("/update-vehicle/:vehicleId", updateVehiclesController);
//get filtered vehicles
router.get("/get-filtered-vehicles/:page", getFilteredVehiclesController);
// price filter vehicles
router.get("/get-price-filtered-vehicles", getPriceFilteredVehiclesController);
//get filtered vehicles by modal
router.get("/get-vehicles-by-modal/:vehiclemodal", getFilteredByModalVehiclesController);


export default router;
