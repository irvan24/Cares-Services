import express from "express";
import {
  initiateCheckout,
  handleWebhook,
} from "../../Controllers/Payement/payement.controllers.js";

const router = express.Router();

router.post("/checkout", initiateCheckout);
router.post("/webhook", handleWebhook);

export default router;
