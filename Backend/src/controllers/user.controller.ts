import { User } from "../models/user.model.js";
import { apiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { Otp } from "../models/otp.model.js";
import { sendOtp } from "../utils/sendEmail.js";
import { ApiResponse } from "../utils/ApiResp.js";

// Function for generating Tokens.
const generateTokens = async (_id: string) => {
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
    console.error("Email Error:", error);
    throw new Error("Something went wrong!");
  }
};

// Registration Controller
const registration = asyncHandler(async (req: any, res: any) => {
  const { userName, email, password, avatar, otpCode } = req.body || {};
  // If fields are empty
  console.log(userName, email, password, avatar, otpCode);
  if (
    [userName, email, password, avatar, otpCode].some(
      (data) => !data || String(data)?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields must me filled");
  }
  // If User already exists
  if (
    await User.findOne({
      $or: [{ userName, email }],
    })
  ) {
    throw new apiError(400, " User already exists");
  }
  // Verifying if otpCode is correct
  if (!Otp.verifyOtp(email, String(otpCode))) {
    throw new apiError(400, "Invalid Otp-code");
  }
  // Creating a User
  const user = await User.create({
    userName: userName,
    email: email,
    password: password,
    avatar: avatar,
    isVerified: true,
  });
  // If user is not created
  if (!user) {
    throw new apiError(500, "Something went wrong while registering");
  }
  const { accessToken, refreshToken } = await generateTokens(
    user._id.toString()
  );
  // Getting created user from database
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // Options for cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  // Returning response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(201, "User is created succesfully", {
        user: createdUser,
        accessToken,
        refreshToken,
      })
    );
});

// Send Otp code for Registration Controller
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

// Log-in Controller
const login = asyncHandler(async (req: any, res: any) => {
  const { userName, email, password } = req.body;

  // Checking if any field is empty
  if (
    [userName, email, password].some((data) => {
      !data || String(data).trim() == "";
    })
  ) {
    throw new apiError(400, "All fields must me filled");
  }

  // Checking if user exists
  const user = await User.findOne({
    $or: [{ userName, email }],
  });

  if (!user) {
    throw new apiError(409, "User doesn't exist");
  }

  // Checking password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Incorrect Password");
  }

  // Creating Tokens
  const { accessToken, refreshToken } = await generateTokens(
    user._id.toString()
  );

  // logged-in user
  const loggedInUser = await User.findById(user._id).select("-password -registerToken");
  // Options for cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "logged-in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

export { otpRegistrationSend, registration, login };
