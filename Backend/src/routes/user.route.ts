import { Router } from "express";
import { login, otpRegistrationSend, registration } from "../controllers/user.controller.js";

const router = Router();

// Route for sending Otp for registration
router.route("/sendOtp").post(otpRegistrationSend);
// Route for registration
router.route("/registration").post(registration);
// Route for log-in
router.route("/login").post(login);

export default router;
