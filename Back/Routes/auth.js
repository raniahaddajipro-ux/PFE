import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();


router.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      mail: user.mail,
      role: user.role,
      avatarColor: user.avatarColor || "#8B5CF6",
      avatarImage: user.avatarImage || null,
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
