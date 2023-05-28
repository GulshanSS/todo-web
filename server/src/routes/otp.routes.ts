import express, { Router } from "express";
import { sendOtpHandler, verifyOTPhandler } from "../controller/otp.controller";

const OtpRouter: Router = express.Router();

OtpRouter.post("/send-otp", sendOtpHandler);
OtpRouter.post("/verify-otp", verifyOTPhandler);

export default OtpRouter;
