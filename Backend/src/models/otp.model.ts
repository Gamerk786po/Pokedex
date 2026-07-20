import { randomInt } from "crypto";
import { Schema, model } from "mongoose";


const OtpSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300,
    },
  },
  { timestamps: true }
);

// Static method for generating a doc in otp collection
OtpSchema.statics.generateOtp = async function (this: any, email: String) {
  // Generating 6 digit code
  const code = randomInt(0, 1000000).toString().padStart(6, "0");
  // Creating a doc in collection OTP
  await this.create({
    code,
    email,
  });
  //   returning the code
  return code;
};

// Static method to verify Otp
OtpSchema.statics.verifyOtp = async function (
  this: any,
  email: String,
  code: String
) {
  // Finding record in collection
  const otpRecord = await this.findOne({
    email: email.toLowerCase(),
    code: code.trim(),
  });
  // returning false when otpRecord isn't in collection
  if (!otpRecord) {
    return false;
  }
  // Deleting the otpRecord after verification
  await otpRecord.deleteOne();
  // Returning true
  return true;
};

export const Otp = model("Otp", OtpSchema);
