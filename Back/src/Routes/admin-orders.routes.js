import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersStats,
} from "../Controllers/admin-orders.controllers.js";

const router = express.Router();

// Routes pour la gestion des commandes
router.get("/", getAllOrders);
router.get("/stats", getOrdersStats);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;
