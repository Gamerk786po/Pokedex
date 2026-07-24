import { Router } from "express";
import { otpRegistrationSend } from "../controllers/user.controller.js";

const router = Router();

router.route("/sendOtp").post(otpRegistrationSend);

export default router;
