import crypto from "crypto";
import bcrypt from "bcrypt";
import userLo from "../models/user.js";
import nodemailer from "nodemailer";
// Function to generate a random token
const generateToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  const tokenLength = 64; // Adjust the token length as needed

  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};

const sendResetEmail = async (emailAddress, resetToken) => {
  try {
    // Construct reset password link
    const resetPasswordLink = `http://localhost:8080/reset-password?token=${resetToken}`;

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server hostname
      port: 587, // Port for secure SMTP (TLS) connection
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vanessabewe@gmail.com", // Your email username
        pass: "pxme opdi iwlh fvcn", // Your email password
      },
    });

    // Send email with reset password link
    await transporter.sendMail({
      from: "Music Forum<vanessabewe@gmail.com>",
      to: emailAddress,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });

    console.log("Reset password email sent successfully.");
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
    throw error;
  }
};

// Function to handle forgot password request
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userLo.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });

    }

    // Generate reset token
    const Token = generateToken();
    const expiration = Date.now() +  900000 ;
    user.token = Token;
    console.log(user.token);
    user.resetTokenExpiration = expiration; // Token expires in 1 hour
    await user.save();

    // Send reset password email
    await sendResetEmail(email, Token);

    return res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

// Function to reset password
const resetPassword = async (req, res) => {
  let { email, resetToken, newPassword } = req.body;

  try {
    const user = await userLo.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if reset token matches
    if (user.token !== resetToken) {
      console.log(user.token);
      return res.status(404).json({ message: "Invalid token" });
    }

    // Check if reset token has expired
    if (user.resetTokenExpiration < Date.now()) {
      return res.status(401).json({ message: "Reset token has expired" });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null; // Reset the token after password change
    user.resetTokenExpiration = null; // Reset the token expiration
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export default { forgotPassword, resetPassword };
