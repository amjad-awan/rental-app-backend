import vehicleLatlongModal from "../modals/vehicleLatLongModal.js";

// add lat long
export const addVehicleLatLongController = async (req, res) => {
  const { lat, long, id } = req.body;
  try {
    // check if lat long of this vehcile already exist or not
    const isLatLongExists = await vehicleLatlongModal.findOne({ vehicle: id });

    // f this vehicle's lat long do exist in database then add that lat long
    if (!isLatLongExists) {
      const latLong = await vehicleLatlongModal({
        lat: lat,
        long: long,
        vehicle: id,
      }).save();
      res.status(200).json({
        success: true,
        message: "latitude and longitude added successfully",
        latLong: latLong,
      });
    }
    if (isLatLongExists) {
      const latLong = await vehicleLatlongModal.findByIdAndUpdate(
        isLatLongExists._id,
        {
          lat: lat,
          long: long,
          vehicle: id,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message:
          "latitude and longitude already exists so updated successfully",
        latLong: latLong,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// get vehicle lat long
export const getVehicleLatLongController = async (req, res) => {
  //   const { vehicletype, phone, fueltype, vehcilemodal, vehcilename } = req.body;
  try {
    const latlong = await vehicleLatlongModal.find().populate("vehicle");
    res.status(200).json({
      success: true,
      message: "latlong list fetched successfully",
      latlong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

export const getSingleVehicleLatLongController = async (req, res) => {
  const { vehicleId } = req.params;
  console.log(" vehicleId 75", vehicleId);
  try {
    const latlong = await vehicleLatlongModal
      .findOne({ vehicle: vehicleId })
    console.log("latlong  74", latlong);
    res.status(200).json({
      success: true,
      message: "vehicle latlong fetched successfully",
      latlong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

export const updateVehicleLatLongController = async (req, res) => {
  const { latLongid } = req.params;
  const { lat, long } = req.body;

  try {
    const latLong = await vehicleLatlongModal
      .findByIdAndUpdate(
        id,
        {
          lat: lat,
          long: long,
        },
        { new: true }
      )
      .save();
    res.status(200).json({
      success: true,
      message: "latitude and longitude updated successfully",
      latLong: latLong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};
