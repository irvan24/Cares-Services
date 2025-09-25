import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes from "./src/Routes/reservations.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running!" });
});

// Route pour les réservations
app.use("/reservations", reservationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
