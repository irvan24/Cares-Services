import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersStats,
} from "../Controllers/admin-users.controllers.js";

const router = express.Router();

// Routes pour la gestion des utilisateurs
router.get("/", getAllUsers);
router.get("/stats", getUsersStats);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
