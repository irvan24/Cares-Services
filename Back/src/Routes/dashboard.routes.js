import express from "express";
import {
  getDashboardStats,
  getRecentOrders,
  getRevenueChart,
} from "../Controllers/dashboard.controllers.js";

const router = express.Router();

// Route pour les statistiques générales du dashboard
router.get("/stats", getDashboardStats);

// Route pour les commandes récentes
router.get("/recent-orders", getRecentOrders);

// Route pour les données du graphique de chiffre d'affaires
router.get("/revenue-chart", getRevenueChart);

export default router;
