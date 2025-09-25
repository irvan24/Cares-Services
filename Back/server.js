import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/Routes/auth.routes.js";
import productRoutes from "./src/Routes/Products/products.routes.js";
import orderRoutes from "./src/Routes/Orders/orders.routes.js";
import orderItemsRoutes from "./src/Routes/Orders/ordersItem.routes.js";
import paymentRoutes from "./src/Routes/Payement/payement.routes.js";
import reviewRoutes from "./src/Routes/Reviews/reviews.routes.js";
import categoryRoutes from "./src/Routes/Category/category.routes.js";
import reservationRoutes from "./src/Routes/reservations.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemsRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
