import express from "express";
import {
  adminLogin,
  verifyAdminToken,
  adminLogout,
} from "../Controllers/auth.controllers.js";

const router = express.Router();

// Routes utilisateur standard (à implémenter si nécessaire)
// router.post("/register", register);
// router.post("/login", login);

// Routes administrateur
router.post("/admin/login", adminLogin);
router.post("/admin/verify", verifyAdminToken);
router.post("/admin/logout", adminLogout);

export default router;
