import orderModal from "../modals/orderModal.js";
import userLatLongModal from "../modals/userLatLongModal.js";
import vehicleModal from "../modals/vehicleModal.js";

// add order
export const addOrderController = async (req, res) => {
  const { username, phone, vehicleid, vehicleOwnerId, userId } = req.body;
  console.log("req.body", req.body);

  try {
    const userLatLong = await userLatLongModal.findOne({ user: userId });
    await orderModal({
      username,
      phone,
      userlatlong: userLatLong._id,
      vehicleid,
      userId,
      vehicleOwnerId,
    }).save();
    res.status(200).json({
      success: true,
      message: "order added successfully",
    });

    await vehicleModal.findByIdAndUpdate(
      vehicleid,
      {
        isbooked: true,
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// get orders
export const getOrdersController = async (req, res) => {
  const { userId } = req.params;
  const { vehicleid } = req.query;
  try {
    const orders = await orderModal
      .find({ vehicleOwnerId: userId, vehicleid })
      .populate("userlatlong")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// get user booking orders
export const getUserBookingsController = async (req, res) => {
  const { userId, vehicleid } = req.query;

  console.log("userId 66", userId)
  console.log("vehicleid 67", vehicleid)
  try {
    const orders = await orderModal
      .find({ userId,vehicleid:{$ne:vehicleid}})
      .populate("userlatlong")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// update order
export const updateOrdersController = async (req, res) => {
  const { orderId } = req.params;
  const { orderstatus, vehicleid } = req.body;
  console.log("orderId", orderId);
  console.log("orderstatus", orderstatus);
  try {
    if (orderstatus === "completed" || orderstatus === "not accepted") {
      await vehicleModal.findByIdAndUpdate(
        vehicleid,
        {
          isbooked: false,
        },
        { new: true }
      );
    }

    if (orderstatus === "accepted") {
      await vehicleModal.findByIdAndUpdate(
        vehicleid,
        {
          isbooked: true,
        },
        { new: true }
      );
    }

    await orderModal.findByIdAndUpdate(orderId, {
      orderstatus,
    });

    res.status(200).json({
      success: true,
      message: "order updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};
