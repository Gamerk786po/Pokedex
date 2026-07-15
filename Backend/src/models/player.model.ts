import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
playerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method for comaparring password
playerSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const Player = model("Player", playerSchema);
