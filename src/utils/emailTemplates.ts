 
export const otpEmailTemplate = (otp: string): string => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background: linear-gradient(to bottom, #ffffff, #f4f4f4); max-width: 500px; margin: auto;">
       <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo"  alt="Cure Track Logo" style="width: 100px; height: auto;">
      </div>
      
      <h2 style="color: #0056b3; text-align: center; font-size: 26px; margin-bottom: 10px;">Welcome to Cure Track!</h2>
      <p style="font-size: 16px; color: #555; text-align: center;">Thank you for joining us! Use the One-Time Password (OTP) below to complete your registration:</p>
      
      <div style="text-align: center; margin: 20px 0;">
          <h1 style="font-size: 36px; color: #007bff; margin: 0; background-color: #d3d3d352; padding: 10px 20px; border-radius: 8px; display: inline-block;">${otp}</h1>
          <p style="font-size: 14px; color: #777; margin: 5px 0;">(Expires in 5 minutes)</p>
      </div>
      
      <p style="font-size: 16px; color: #555; text-align: center;">Enter this code to verify your account and get started!</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this, please disregard this email.</p>
      
      <p style="font-size: 14px; color: #333; text-align: center; margin-top: 30px;">Warm regards,<br><strong>Cure Track Team</strong></p>
    </div>
    `;
  };
  