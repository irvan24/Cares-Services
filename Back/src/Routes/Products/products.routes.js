import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
} from "../../Controllers/Products/products.controllers.js";

const router = express.Router();

// Routes publiques
router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Routes admin pour les produits
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Routes admin pour les catégories
router.post("/categories", createCategory);

export default router;
