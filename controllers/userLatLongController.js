import userLatLongModal from "../modals/userLatLongModal.js";
import vehicleLatlongModal from "../modals/vehicleLatLongModal.js";

// add lat long
export const addUsereLatLongController = async (req, res) => {

  const {lat, long, id}=req.body
  try {
// check if lat long of this vehcile already exist or not
    const isLatLongExists= await userLatLongModal.findOne({user:id})

      // f this vehicle's lat long do exist in database then add that lat long
    if(!isLatLongExists)
    {
      const latLong = await userLatLongModal({
        lat: lat,
        long: long,
        user: id
      }).save();
      res.status(200).json({
        success: true,
        message: "latitude and longitude added successfully",
        latLong: latLong,
      })
    }

    // f this user's lat long exist in database then update that lat long
 if(isLatLongExists)
 {
  const latLong = await userLatLongModal.findByIdAndUpdate(isLatLongExists._id,{
    lat: lat,
    long: long,
    vehicle: id
  },{new:true});
  res.status(200).json({
    success: true,
    message: "latitude and longitude already exists so updated successfully",
    latLong: latLong,
  })
 }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// get user lat long
export const getUserLatLongController = async (req, res) => {
  //   const { vehicletype, phone, fueltype, vehcilemodal, vehcilename } = req.body;
  const { userId } = req.params;

  try {
    const latlong = await userLatLongModal.findOne({user:userId}).populate("user");
    res.status(200).json({
      success: true,
      message: "user's latlong list fetched successfully",
      latlong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
}

// get user lat long
export const getSigleUserLatLongController = async (req, res) => {
    const { userId } = req.params;

  try {
    const userlatlong = await userLatLongModal.find({user:userId})
    res.status(200).json({
      success: true,
      message: "user's latlong list fetched successfully",
      userlatlong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
}

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
