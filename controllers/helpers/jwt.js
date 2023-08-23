import jwt from "jsonwebtoken";
export const getJwt = async (oldUser) => {
  try {
    console.log("oldUser ", oldUser);
    return jwt.sign({_id:oldUser._id}, "rent_app_token", {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
  }
};
