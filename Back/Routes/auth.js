import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import dotenv from "dotenv";
import { sendResetPasswordEmail } from "../services/mailservice.js";
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
router.post("/forgot-password", async (req, res) => {
  const { mail } = req.body;

  const user = await User.findOne({ mail });

  // Toujours réponse OK (sécurité)
  if (!user) {
    return res.json({ message: "Email sent if the account exists" });
  }

  // Générer token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hasher token
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendResetPasswordEmail(user.mail, resetLink);

  res.json({ message: "Email sent" });
});
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired link" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password updated" });
});

export default router;
