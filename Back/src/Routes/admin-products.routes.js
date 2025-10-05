import express from "express";
import multer from "multer";
import { authenticateUser } from "../Middleware/authenticateUser.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../Controllers/admin-products.controllers.js";

const router = express.Router();

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées"), false);
    }
  },
});

// Routes pour la gestion des produits
router.get("/", authenticateUser, getAllProducts);
router.get("/:id", authenticateUser, getProductById);
router.post("/", authenticateUser, upload.single("image"), createProduct);
router.post("/upload", authenticateUser, upload.single("image"), uploadImage);
router.put("/:id", authenticateUser, updateProduct);
router.delete("/:id", authenticateUser, deleteProduct);

export default router;
