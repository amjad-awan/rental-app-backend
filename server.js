import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import vehcileRoute from "./routes/vehcileRoute.js";
import vehicleLatLong from "./routes/vehicleLatLongRoute.js";
import userLatLong from "./routes/userLatLongRoute.js";

import orderRoute from "./routes/orderRoute.js";

// cl
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
import bodyparser from "body-parser";
import cors from "cors";

import cloudinary from "cloudinary";
const v2 = cloudinary.v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import vehicleModal from "./modals/vehicleModal.js";

const app = express();

v2.config({
  cloud_name: "drcdjp6s7",
  api_key: "279813645311944",
  api_secret: "bBFOBCNPV-4wYp0mZv-Z_Je6Umk",
});

//config env
dotenv.config();

//config databse
connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)

//middlewares
app.use(express.json());
// app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname, "./client/build")));
const PORT = process.env.PORT || 5000;

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "RENT_APP",
  },
});
const upload = multer({ storage: storage });
app.get("/", (req, res) => {
  return res.json({ message: "Hello World 🇵🇹 🙌" });
});

app.post("/upload-photo", upload.single("picture"), async (req, res) => {
  const result = await v2.uploader.upload(req.file.path);
  return res.json({
    picture: result.secure_url,
    cloudinary_picture_id: result.public_id,
  });
});

app.put(
  "/update_cloudinary_picture/:cloudinary_picture_id",
  upload.single("picture"),
  async (req, res) => {
    const public_id = req.params.cloudinary_picture_id;
    // First, delete the old image using its public ID
    await v2.uploader.destroy(public_id);

    // Now, upload the new image with the same public ID
    await v2.uploader.upload(
      req.file.path,
      { public_id: public_id },
      (error, result) => {
        if (error) {
          console.error("Error updating image:", error);
          return res.status(500).json({ error: "Image update failed" });
        }
        return res.status(200).json({
          picture: result.secure_url,
          cloudinary_picture_id: result.public_id,
          message: "Image updated successfully",
        });
      }
    );
  }
);

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/vehcile", vehcileRoute);
app.use("/api/v1/vehiclelatlong", vehicleLatLong);

app.use("/api/v1/userlatlong", userLatLong);
app.use("/api/v1/order", orderRoute);

// app.use("/api/v1/photo", photoRoute);

// app.use("/api/v1/product", productRoutes);

// rest api

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
app.get("/",(req, res)=>{
  res.send("api is running")
})

app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`.yellow);
});
