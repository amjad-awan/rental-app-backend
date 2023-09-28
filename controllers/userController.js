import userModal from "../modals/userModal.js";

import bcrypt from "bcrypt";
import { getJwt } from "./helpers/jwt.js";

// create user
export const createUserController = async (req, res) => {
  const { username, phone, password, vehicleadded, vehicleid } = req.body;

  console.log("vehicleadded 10", vehicleadded);

  try {
    switch (true) {
      case !username:
        res.status(400).json({
          success: false,
          message: "User name is required",
        });
      case !phone:
        res.status(400).json({
          success: false,
          message: "Email is required",
        });
      case !password:
        res.status(400).json({
          success: false,
          message: "Password is required",
        });
    }

    // check this email already exist
    const isAccountExist = await userModal.findOne({ phone });
    if (!isAccountExist) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // create user
      const newUser = await userModal({
        username,
        phone,
        password: hashed,
        vehicleadded,
        vehicleid,
      }).save();

      res.status(200).json({
        success: true,
        message: "user added successfully",
        user: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Account already exists, please login",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// login user
export const loginUserController = async (req, res) => {
  const { phone, password } = req.body;
  try {
    switch (true) {
      case !password:
        res.status(400).json({
          success: false,
          message: "Password is required",
        });
    }
    const oldUser = await userModal.findOne({phone});
    console.log("oldUser =====", oldUser)

    if (oldUser) {
      const comparPass = await bcrypt.compare(password, oldUser.password);
      if (!comparPass) {
        res.status(403).json({
          success: false,
          message: "Whone password",
        });
      }

      const token = await getJwt(oldUser);

      res.status(200).json({
        success: true,
        message: "logged in successfully",
        user: {
          _id: oldUser._id,
          username: oldUser.username,
          phone: oldUser.phone,
          vehicleadded: oldUser.vehicleadded,
          vehicleid: oldUser.vehicleid,
          token,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Account does not exist, please register",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};
