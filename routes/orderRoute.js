import  express  from "express";
import { addOrderController, getOrdersController, getUserBookingsController, updateOrdersController } from "../controllers/orderController.js";
const router= express.Router()
router.post("/add-order",addOrderController)
router.get("/get-orders/:userId",getOrdersController)
router.put("/update-order/:orderId",updateOrdersController)
router.get("/get-user-bookings",getUserBookingsController)


export default router