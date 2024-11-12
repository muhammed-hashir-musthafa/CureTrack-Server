import { Request, Response } from "express";
import AdminSchema from "../../models/adminModels/adminSchema";
import { generateTokens } from "../../utils/jwt";
import { comparePassword } from "../../utils/bcrypt";

const login = async (req: Request, res: Response) => {
  interface loginBody {
    email: string;
    password: string;
  }

  try {
    const { email, password }: loginBody = req.body;

    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "Email or PhoneNumber and password are required",
      });
      return;
    }

    const admin = await AdminSchema.findOne({ email });

    if (!admin) {
      res.status(402).json({
        success: false,
        message: "No admin found. Please create an account",
      });
      return;
    }

    const validatedAdmin = await comparePassword(password, admin?.password);

    if (!validatedAdmin) {
      res.status(403).json({
        success: false,
        message: "Invalid password",
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
      message: "Admin login successfully ",
      data: admin,
    });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
    return;
  }
};

export { login };
