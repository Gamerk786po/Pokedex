import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";

const playerSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
    },
    isVerified: {
      type: Boolean,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hashing password before save
playerSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method for comaparring password
playerSchema.methods.isPasswordCorrect = async function (
  this: any,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

// Method for generating tokens
playerSchema.methods.generateAccessToken = function (this: any) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY as StringValue;

  // Checking if secret is undefined
  if (!secret) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in the environment variables."
    );
  }

  // Returning the token
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    secret,
    {
      expiresIn: expiry,
    }
  );
};

// Generating refresh Token
playerSchema.methods.generateRefreshToken = function (this: any) {
  // Taking secret and expiry from .env
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY as StringValue;

  // checking if secret is undefined or not
  if (!secret)
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in the environment variables."
    );
  // Generating refresh token
  jwt.sign(
    {
      _id: this._id,
    },
    secret,
    {
      expiresIn: expiry,
    }
  );
};
export const Player = model("Player", playerSchema);
