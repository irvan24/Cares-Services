import { supabase } from "../../supabaseClient.js";

/**
 * GET /order-items/:orderId/items
 * Récupère tous les produits d’une commande spécifique
 */
export const getOrderItems = async (req, res) => {
  const { orderId } = req.params;

  const { data, error } = await supabase
    .from("order_items")
    .select("*, products(*)")
    .eq("order_id", orderId);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};
