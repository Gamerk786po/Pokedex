import { Router } from "express";
import { otpRegistrationSend, registration } from "../controllers/user.controller.js";

const router = Router();

// Route for sending Otp for registration
router.route("/sendOtp").post(otpRegistrationSend);
// Route for registration
router.route("/registration").post(registration);

export default router;
