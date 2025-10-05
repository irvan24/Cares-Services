import express from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../Controllers/Category/category.controllers.js";
import { authenticateUser as authenticate } from "../../Middleware/authenticateUser.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", authenticate, createCategory); // admin
router.delete("/:id", authenticate, deleteCategory); // admin

export default router;
