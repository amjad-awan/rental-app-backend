import userModal from "../modals/userModal.js";
import vehicleModal from "../modals/vehicleModal.js";

// get vehicle
export const getVehicleController = async (req, res) => {
  //   const { vehicletype, phone, fueltype, vehcilemodal, vehcilename } = req.body;

  try {
    const Vehicles = await vehicleModal.find();
    res.status(200).json({
      success: true,
      message: "vehicle list fetched successfully",
      vehicles: Vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// add vehicle
export const addVehicleController = async (req, res) => {
  const { userId } = req.body;
  try {
    // check this user's vehicle already exist or not
    const vehicleExist = await vehicleModal.findOne({ userId });
    if(vehicleExist){
      return res.status(403).json({
        success: true,
        message: "your vehicle already exists",
      });
    }
    if (!vehicleExist) {
      const newvehicle = await vehicleModal({
        ...req.body,
      }).save();

      console.log("newvehicle", newvehicle);
      await userModal.findByIdAndUpdate(
        userId,
        {
          vehicleadded: true,
          vehicleid: await newvehicle._id,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "vehicle added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// get single vehicle
export const getSingleVehiclesController = async (req, res) => {
  try {
    const { vehiclid } = req.params;
    const vehicle = await vehicleModal.findOne({ _id: vehiclid });
    res.status(200).json({
      success: true,
      message: "vehicle  fetched successfully",
      vehicle: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// update vehicle
export const updateVehiclesController = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    await vehicleModal.findByIdAndUpdate(
      vehicleId,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "vehicle  updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};



// filter vehicles
export const getFilteredVehiclesController = async (req, res) => {
  try {
    const page = Number(req.params.page) || 1;

    console.log("req.params.page ===", page);

    const limit = 6;
    const skip = (page - 1) * limit;
    const vehicles = await vehicleModal
      .find({})
      .skip(Math.abs(skip))
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "vehicle list fetched successfully",
      vehicles: vehicles,
      currentPage: page,
      total: await vehicleModal.countDocuments(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// filter vehicles
export const getPriceFilteredVehiclesController = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const vehicles = await vehicleModal.find({
      rent: { $lte: maxPrice, $gte: minPrice },
    });

    res.status(200).json({
      success: true,
      message: "vehicle list fetched successfully",
      total: vehicles.length,
      vehicles: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// filter vehicles by modal
export const getFilteredByModalVehiclesController = async (req, res) => {
  try {
    const { vehiclemodal } = req.params;

    console.log("vehiclemodal", vehiclemodal);

    const vehicles = await vehicleModal.find({ vehiclemodal: vehiclemodal });

    res.status(200).json({
      success: true,
      message: "vehicle list fetched successfully",
      total: vehicles.length,
      vehicles: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};
