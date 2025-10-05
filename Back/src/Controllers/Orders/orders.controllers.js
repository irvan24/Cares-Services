import { supabase } from "../../supabaseClient.js";

/**
 * POST /orders
 * Crée une commande pour l'utilisateur connecté
 */
export const createOrder = async (req, res) => {
  const user = req.user;
  const { total_amount, items } = req.body;

  // 1. Créer la commande
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([{ user_id: user.id, total_amount, status: "pending" }])
    .select()
    .single();

  if (orderError) return res.status(500).json({ error: orderError.message });

  // 2. Insérer les items dans order_items
  const itemsToInsert = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);

  if (itemsError) return res.status(500).json({ error: itemsError.message });

  res.status(201).json({ message: "Commande créée", order_id: order.id });
};

/**
 * GET /orders
 * Récupère les commandes de l'utilisateur connecté
 */
export const getUserOrders = async (req, res) => {
  const user = req.user;

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

/**
 * GET /orders/:id
 * Détail d'une commande
 */
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: "Commande introuvable" });
  res.json(data);
};

/**
 * PATCH /orders/:id
 * Met à jour le statut (admin / livraison)
 */
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Statut mis à jour" });
};

/**
 * DELETE /orders/:id
 * Annule une commande (user)
 */
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Commande annulée" });
};
