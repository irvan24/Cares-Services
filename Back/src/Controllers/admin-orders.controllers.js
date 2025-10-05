import { supabase } from "../supabaseClient.js";

/**
 * GET /admin/orders
 * Récupérer toutes les commandes avec pagination
 */
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = "", search = "" } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("Orders")
      .select(
        `
        *,
        Users (
          full_name,
          email
        )
      `
      )
      .order("created_at", { ascending: false });

    // Filtre par statut
    if (status) {
      query = query.eq("status", status);
    }

    // Filtre par recherche (nom client ou email)
    if (search) {
      query = query.or(
        `Users.full_name.ilike.%${search}%,Users.email.ilike.%${search}%`
      );
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: orders, error } = await query;

    if (error) {
      console.error("Erreur récupération commandes:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des commandes",
      });
    }

    // Compter le total pour la pagination
    let countQuery = supabase
      .from("Orders")
      .select("*", { count: "exact", head: true });

    if (status) {
      countQuery = countQuery.eq("status", status);
    }

    const { count: totalCount } = await countQuery;

    res.status(200).json({
      success: true,
      data: {
        orders:
          orders?.map((order) => ({
            id: order.id,
            total_amount: parseFloat(order.total_amount) || 0,
            status: order.status,
            payment_status: order.payment_status,
            shipping_address: order.shipping_address,
            created_at: order.created_at,
            updated_at: order.updated_at,
            customer: {
              name: order.Users?.full_name || "Client inconnu",
              email: order.Users?.email || "",
            },
          })) || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount || 0,
          pages: Math.ceil((totalCount || 0) / limit),
        },
      },
    });
  } catch (error) {
    console.error("Erreur récupération commandes:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des commandes",
    });
  }
};

/**
 * GET /admin/orders/:id
 * Récupérer une commande par ID avec ses items
 */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer la commande
    const { data: order, error: orderError } = await supabase
      .from("Orders")
      .select(
        `
        *,
        Users (
          full_name,
          email,
          phone
        )
      `
      )
      .eq("id", id)
      .single();

    if (orderError) {
      console.error("Erreur récupération commande:", orderError);
      return res.status(404).json({
        success: false,
        error: "Commande non trouvée",
      });
    }

    // Récupérer les items de la commande
    const { data: orderItems, error: itemsError } = await supabase
      .from("OrderItems")
      .select(
        `
        *,
        Products (
          name,
          price,
          image
        )
      `
      )
      .eq("order_id", id);

    if (itemsError) {
      console.error("Erreur récupération items:", itemsError);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des items de la commande",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: order.id,
        total_amount: parseFloat(order.total_amount) || 0,
        status: order.status,
        payment_status: order.payment_status,
        shipping_address: order.shipping_address,
        created_at: order.created_at,
        updated_at: order.updated_at,
        customer: {
          name: order.Users?.full_name || "Client inconnu",
          email: order.Users?.email || "",
          phone: order.Users?.phone || "",
        },
        items:
          orderItems?.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: parseFloat(item.price) || 0,
            total: parseFloat(item.price) * item.quantity,
            product: {
              name: item.Products?.name || "Produit inconnu",
              image: item.Products?.image || "",
            },
          })) || [],
      },
    });
  } catch (error) {
    console.error("Erreur récupération commande:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de la commande",
    });
  }
};

/**
 * PUT /admin/orders/:id/status
 * Mettre à jour le statut d'une commande
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Le statut est requis",
      });
    }

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Statut invalide",
      });
    }

    const { data: order, error } = await supabase
      .from("Orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur mise à jour statut:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la mise à jour du statut",
      });
    }

    res.status(200).json({
      success: true,
      message: "Statut mis à jour avec succès",
      data: order,
    });
  } catch (error) {
    console.error("Erreur mise à jour statut:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour du statut",
    });
  }
};

/**
 * GET /admin/orders/stats
 * Récupérer les statistiques des commandes
 */
export const getOrdersStats = async (req, res) => {
  try {
    // Compter les commandes par statut
    const { data: ordersByStatus, error: statusError } = await supabase
      .from("Orders")
      .select("status");

    if (statusError) {
      console.error("Erreur stats commandes:", statusError);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des statistiques",
      });
    }

    const stats = {
      pending: 0,
      processing: 0,
      shipped: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    };

    ordersByStatus?.forEach((order) => {
      stats.total++;
      if (stats.hasOwnProperty(order.status)) {
        stats[order.status]++;
      }
    });

    // Chiffre d'affaires par mois (6 derniers mois)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: revenueData, error: revenueError } = await supabase
      .from("Orders")
      .select("total_amount, created_at, status")
      .eq("status", "completed")
      .gte("created_at", sixMonthsAgo.toISOString());

    if (revenueError) {
      console.error("Erreur CA mensuel:", revenueError);
    }

    const monthlyRevenue = {};
    revenueData?.forEach((order) => {
      const date = new Date(order.created_at);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += parseFloat(order.total_amount) || 0;
    });

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        monthlyRevenue: Object.entries(monthlyRevenue).map(
          ([month, revenue]) => ({
            month,
            revenue: Math.round(revenue * 100) / 100,
          })
        ),
      },
    });
  } catch (error) {
    console.error("Erreur stats commandes:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};
