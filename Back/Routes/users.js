// Routes/users.js
import express from "express";
import { 
  updateProfile, 
  updatePassword, 
  getUserProfile 
} from "../Controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @route   PUT /api/user/update-profile
 * @desc    Update user profile (email, phone, avatar)
 * @access  Private (requires authentication)
 */
// PUT /api/user/update-profile
// Routes/users.js
router.put(
  "/update-profile",
  authenticateToken,        // ✅ Step 1: Verify JWT token → sets req.user
  upload.single("avatar"),  // ✅ Step 2: Parse FormData → sets req.file & req.body
  updateProfile             // ✅ Step 3: Controller processes request
);

/**
 * @route   PUT /api/user/update-password
 * @desc    Update user password
 * @access  Private (requires authentication)
 */
router.put(
  "/update-password",
  authenticateToken,
  updatePassword
);


/**
 * @route   GET /api/user/profile/:userId
 * @desc    Get user profile
 * @access  Private (requires authentication)
 */
router.get("/profile/:userId", authenticateToken, getUserProfile);

export default router;