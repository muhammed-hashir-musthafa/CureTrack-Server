import { Request, Response } from "express";
import AdminSchema from "../../models/adminModels/adminSchema";
import pendingAdmins from "../../utils/pendingAdmin";
import { verifyOTP } from "../../utils/otp";
import { generateTokens } from "../../utils/jwt";

export const verifySignUpOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp }: { email: string; otp: string } = req.body;

    if (!email || !otp) {
      res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
      return;
    }

    const isValidOTP = verifyOTP(email, otp);
    if (!isValidOTP) {
      res
        .status(403)
        .json({ success: false, message: "Invalid or expired OTP." });
      return;
    }

    const adminData = pendingAdmins[email];
    if (!adminData) {
      res
        .status(404)
        .json({ success: false, message: "No pending admin found." });
      return;
    }

    const newAdmin = new AdminSchema({
      fullName: adminData.firstName + " " + adminData.lastName,
      email: adminData.email,
      phoneNumber: adminData.phoneNumber,
      password: adminData.password,
      isVerified: true,
    });

    await newAdmin.save();
    delete pendingAdmins[email];

    const admin = await AdminSchema.findOne({ email });
    if (!admin) {
      res.status(402).json({
        success: false,
        message: "No admin found. Please create an account",
      });
      return;
    }
    const { accessToken, refreshToken } = generateTokens(admin.id);

    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully. Admin registered.",
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Server serror: ${err.message}` });
    return;
  }
};
