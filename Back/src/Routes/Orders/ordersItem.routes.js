import express from "express";
import { getOrderItems } from "../../Controllers/Orders/ordersItem.controllers.js";
import { authenticateUser as authenticate } from "../../Middleware/authenticateUser.js";

const router = express.Router();

router.get("/:orderId/items", authenticate, getOrderItems);

export default router;
