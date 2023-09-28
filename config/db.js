import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://amjadmalikf53:J4XXPDHtcIfuk7nB@cluster0.akgomod.mongodb.net/car-rental-app"; // Replace with your MongoDB connection URL

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected ${db.connection.host}`.bgWhite);
  } catch (error) {
    console.error("MongoDB connection error:".bgRed, error);
  }
};
