import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import unauthenticatedError from "../errors/index.js";
import userLo from "../models/user.js";
import configurations from "../configs/index.js";

const userLogin = async (req, res) => {
  try {
    const user = await userLo.findOne({ name: req.body.name });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      // Passwords match
      // Generate JWT token
      const token = JWT.sign(
        { id: user._id, name: user.name },
        configurations.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(200).json({ msg: "Login successful"});
    } else {
      // Passwords don't match
      return res.status(401).json(unauthenticatedError("Incorrect password"));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export default userLogin;
