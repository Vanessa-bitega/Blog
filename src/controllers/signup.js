import   bcrypt  from "bcrypt";
import JWT from "jsonwebtoken";
import user from "../models/user.js";
const saltRounds = 10;

const userSignup = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  // Check if user already exists
  const checkUser = await user.findOne({
    $or: [{ name: data.name }, { email: data.email }],
  });

  if (checkUser) {
    if (checkUser.name === data.name) {
      return res.status(409).json({ message: "Username already exists" });
    } else {
      return res.status(409).json({ message: "Email already exists" });
    }
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const newUser = new user(data);
    await newUser.save();
    return res.status(201).json({ msg:'successfylly signed in' });
  }
};

export default userSignup;
   
 
