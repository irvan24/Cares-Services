import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../../Controllers/Orders/orders.controllers.js";
import { authenticateUser as authenticate } from "../../Middleware/authenticateUser.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getUserOrders);
router.get("/:id", authenticate, getOrderById);
router.patch("/:id", authenticate, updateOrderStatus); // admin ou staff
router.delete("/:id", authenticate, cancelOrder);

export default router;
