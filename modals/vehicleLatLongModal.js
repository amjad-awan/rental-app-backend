import mongoose from "mongoose";

const latLongSchama = new mongoose.Schema(
  {
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("vehiclelatLong", latLongSchama);
