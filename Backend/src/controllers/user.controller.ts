import { User } from "../models/user.model.js";
import { apiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { Otp } from "../models/otp.model.js";
import { sendOtp } from "../utils/sendEmail.js";
import { ApiResponse } from "../utils/ApiResp.js";

// Function for generating Tokens.
const generateTokens = async (_id: String) => {
  try {
    const user = await User.findById(_id);
    // if user with _id doesn't exist
    if (!user) {
      throw Error("Incorect _id");
    }
    // Generating tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // Saving refreshToken in db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    // Returning the tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong!");
    console.error("Email Error:", error);
  }
};

const otpRegistrationSend = asyncHandler(async (req: any, res: any) => {
  const { userName, email, password, avatar } = req.body;
  // If fields are empty
  if (
    [userName, email, password, avatar].some(
      (data: string) => !data || data?.trim() == ""
    )
  ) {
    throw new apiError(400, "All fields must me filled");
  }

  // If user already exists
  const user = await User.findOne({
    $or: [{ userName, email }],
  });
  if (user) {
    throw new apiError(409, "User already exists");
  }
  // Generating OtpReq and sending Resp
  const otpCode = await Otp.generateOtp(email);
  await sendOtp({ otp: otpCode, email });
  return res
    .status(200)
    .json(new ApiResponse(200, "OTP sent successfully to your email!"));
});

export {
  otpRegistrationSend
}