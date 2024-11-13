import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { otpEmailTemplate } from "./emailTemplates";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"Cure Track" <${process.env.EMAIL_USER}>`,
    to: email,
    replyTo: "curetrackproject@gmail.com",
    subject: "Your OTP Code",
    html: otpEmailTemplate(otp),
    attachments: [
      {
        filename: "Logo.png",
        path: "D:/Mine/Web Designing/Cure Track/CureTrack-Server/assets/Logo.png",
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log(`OTP sent successfully to ${email}`);
  } catch (error) {
    console.error("Failed to send OTP via email:", error);
    throw new Error("Failed to send OTP via email.");
  }
};
