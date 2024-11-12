import express from "express";
import { login } from "../controllers/adminControllers/loginController";
import { verifySignUpOTP } from "../controllers/adminControllers/otpController";
import { refreshAccessToken } from "../controllers/adminControllers/tokenController";

const baseRoutes = express.Router();

baseRoutes.post("/login", login);
baseRoutes.post("/verify-otp", verifySignUpOTP);
baseRoutes.post("/refresh-token", refreshAccessToken);

export { baseRoutes };
