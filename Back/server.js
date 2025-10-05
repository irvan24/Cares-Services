import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/Routes/auth.routes.js";
import productRoutes from "./src/Routes/Products/products.routes.js";
import orderRoutes from "./src/Routes/Orders/orders.routes.js";
import orderItemsRoutes from "./src/Routes/Orders/ordersItem.routes.js";
import paymentRoutes from "./src/Routes/Payement/payement.routes.js";
import reviewRoutes from "./src/Routes/Reviews/reviews.routes.js";
import categoryRoutes from "./src/Routes/Category/category.routes.js";
import reservationRoutes from "./src/Routes/reservations.routes.js";

// Routes admin
import dashboardRoutes from "./src/Routes/dashboard.routes.js";
import adminProductsRoutes from "./src/Routes/admin-products.routes.js";
import adminOrdersRoutes from "./src/Routes/admin-orders.routes.js";
import adminUsersRoutes from "./src/Routes/admin-users.routes.js";
import adminCategoriesRoutes from "./src/Routes/admin-categories.routes.js";

dotenv.config();
const app = express();

// Configuration pour les imports ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemsRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/categories", categoryRoutes);

// Routes admin
app.use("/dashboard", dashboardRoutes);
app.use("/admin/products", adminProductsRoutes);
app.use("/admin/orders", adminOrdersRoutes);
app.use("/admin/users", adminUsersRoutes);
app.use("/admin/categories", adminCategoriesRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Routes disponibles:`);
  console.log(`   GET  /products - Liste des produits`);
  console.log(`   POST /auth/admin/login - Connexion admin`);
  console.log(`   POST /reservations - Créer une réservation`);
  console.log(`   GET  /categories - Liste des catégories`);
  console.log(`   GET  /dashboard/stats - Statistiques dashboard`);
  console.log(`   GET  /admin/products - Gestion produits`);
  console.log(`   GET  /admin/orders - Gestion commandes`);
  console.log(`   GET  /admin/users - Gestion utilisateurs`);
  console.log(`   GET  /admin/categories - Gestion catégories`);
});

// Gestion des erreurs non capturées
process.on("uncaughtException", (error) => {
  console.error("❌ Erreur non capturée:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promesse rejetée non gérée:", reason);
  process.exit(1);
});
