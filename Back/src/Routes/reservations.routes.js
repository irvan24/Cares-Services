import express from "express";
import {
  createReservation,
  getReservations,
} from "../Controllers/reservations.controllers.js";

const router = express.Router();

// Route pour créer une réservation
router.post("/", createReservation);

// Route pour récupérer les réservations
router.get("/", getReservations);

export default router;
