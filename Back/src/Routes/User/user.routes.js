import express from "express";
import {
  getCurrentUser,
  updateCurrentUser,
  updateAvatar,
  deleteCurrentUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../../Controllers/User/user.controllers.js";

import { authenticateUser as authenticate } from "../../Middleware/authenticateUser.js";

const router = express.Router();

// Routes accessibles aux utilisateurs connectés
router.get("/me", authenticate, getCurrentUser);
router.patch("/me", authenticate, updateCurrentUser);
router.patch("/me/avatar", authenticate, updateAvatar);
router.delete("/me", authenticate, deleteCurrentUser);

// Routes admin uniquement (tu peux ajouter un middleware isAdmin plus tard)
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.delete("/:id", authenticate, deleteUserById);

export default router;
