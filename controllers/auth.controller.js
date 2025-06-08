import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const normalizedRole = role?.toLowerCase() || "user";

    // create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole || "user",
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const signup = async (request, response) => {
  try {
    let { name, email, password } = request.body;
    // Check if user has an account
    let user = await User.findOne({ email });
    if (user) return response.status(400).send("User already exists");
    // Hashing password
    let hashedPassword = await bcrypt.hash(password, 10);
    // Saving user in database
    user = await User.create({ name, email, password: hashedPassword });
    response.send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User doesn't have an account" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send({ message: "Server error" });
  }
};
