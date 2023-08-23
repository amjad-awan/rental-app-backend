import mongoose from "mongoose";

const userSchama = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    vehicleadded: {
      type: Boolean,
    },
    vehicleid:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchama);
