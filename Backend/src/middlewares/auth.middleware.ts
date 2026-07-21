import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/ApiError.js";

// Function for Authorization
export const jwtVerify = (req: any, res: any, next: any) => {
  try {
    // getting Token from cookies or header
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer-", "");
    if (!token) {
      throw new apiError(401, "unauthorized token");
    }

    // Decoded Token using Secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new apiError(401, "Invalid Access Token");
    }
    // Checking if decodedToken is not a string and _id is in decodedToken
    if (typeof decodedToken !== "string" && "_id" in decodedToken) {
      // Finding user by _id in decodedToken
      const user = User.findById(decodedToken?._id);
      //   Attaching user with request
      req.user = user;
      next();
    } else {
      throw new apiError(401, "unauthorized token");
    }
  } catch (error) {
    return next(new apiError(401, error.message || "Invalid Access Token"));
  }
};
