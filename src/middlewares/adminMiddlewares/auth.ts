import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET environment variable is not set.");
}

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token

    if (!token) {
      res.status(400).json({ success: false, message: "Access denied" });
      return;
    }
    const tokenValidate = jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload;

    if (!tokenValidate || tokenValidate.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Access denied: Insufficient permissions",
        });
      }

    next();
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
    return;
  }
};
