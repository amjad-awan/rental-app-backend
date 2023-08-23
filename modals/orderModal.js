import mongoose from "mongoose";

const orderSchama = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    vehicleOwnerId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    orderstatus: {
      type: String,
      default: "not accepted",
      enum: ["not accepted", "accepted", "completed"],
    },
    vehicleid: {
      type: String,
      require: true,
    },
    userlatlong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userlatLong",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchama);
