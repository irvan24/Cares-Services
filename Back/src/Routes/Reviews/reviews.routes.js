import express from "express";
import {
  createReview,
  getProductReviews,
  deleteReview,
} from "../../Controllers/Reviews/reviews.controllers.js";
import { authenticateUser as authenticate } from "../../Middleware/authenticateUser.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);
router.post("/product/:productId", authenticate, createReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
