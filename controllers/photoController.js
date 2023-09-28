import express from "express";
import cloudinary from "cloudinary";
const v2 = cloudinary.v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const app = express();

v2.config({
  cloud_name: "drcdjp6s7",
  api_key: "279813645311944",
  api_secret: "bBFOBCNPV-4wYp0mZv-Z_Je6Umk",
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "DEV",
  },
});

  
  const upload = multer({ storage: storage });
  
  app.get("/", (req, res) => {
    return res.json({ message: "Hello World 🇵🇹 🙌" });
  });
  
  app.post("/upload-photo", upload.single("picture"), async (req, res) => {

    console.log(" req.file",  req.file)
    return res.json({ picture: req.file.path });
  });
  
