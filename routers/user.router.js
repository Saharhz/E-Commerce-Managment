import express from "express";
import {
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} from "../modules/user/user.controller.js";

import { verifyToken, RoleGuard } from "../Middleware/Auth.js";

const router = express.Router();

// Authenticated user
router.get("/profile", verifyToken, getUserProfile);

// Admin-only routes
router.get("/", verifyToken, RoleGuard("admin"), getAllUsers);
router.get("/:id", verifyToken, RoleGuard("admin"), getUserById);
router.put("/:id", verifyToken, RoleGuard("admin"), updateUser);
router.delete("/:id", verifyToken, RoleGuard("admin"), deleteUser);

export default router;
