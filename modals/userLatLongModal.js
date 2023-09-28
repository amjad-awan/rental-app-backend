import mongoose from "mongoose";

const userlatLongSchama = new mongoose.Schema(
  {
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("userlatLong", userlatLongSchama);
