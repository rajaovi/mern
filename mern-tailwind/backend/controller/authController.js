import User from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie  from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailTrap/email.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 1000, // 24 hours
    });

    await user.save();

    // JWT Token generation
    generateTokenAndSetCookie(res, user._id);
    sendVerificationEmail(
      user.email,
      verificationToken
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

     res.send("Sign Up");
}

const login = async (req, res) => {
  res.send("Sign Up");
};

const logout = async (req, res) => {
  res.send("Sign Up");
};

export { signup, login, logout };
