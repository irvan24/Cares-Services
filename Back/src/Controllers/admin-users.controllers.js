import { supabase } from "../supabaseClient.js";

/**
 * GET /admin/users
 * Récupérer tous les utilisateurs avec pagination
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", role = "" } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("Users")
      .select("*")
      .order("created_at", { ascending: false });

    // Filtre par recherche
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Filtre par rôle
    if (role) {
      query = query.eq("role", role);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: users, error } = await query;

    if (error) {
      console.error("Erreur récupération utilisateurs:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des utilisateurs",
      });
    }

    // Compter le total pour la pagination
    let countQuery = supabase
      .from("Users")
      .select("*", { count: "exact", head: true });

    if (search) {
      countQuery = countQuery.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    if (role) {
      countQuery = countQuery.eq("role", role);
    }

    const { count: totalCount } = await countQuery;

    res.status(200).json({
      success: true,
      data: {
        users:
          users?.map((user) => ({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            created_at: user.created_at,
            updated_at: user.updated_at,
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
    console.error("Erreur récupération utilisateurs:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des utilisateurs",
    });
  }
};

/**
 * GET /admin/users/:id
 * Récupérer un utilisateur par ID
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur récupération utilisateur:", error);
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    console.error("Erreur récupération utilisateur:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de l'utilisateur",
    });
  }
};

/**
 * PUT /admin/users/:id
 * Mettre à jour un utilisateur
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, role, phone } = req.body;

    const updateData = {};
    if (full_name !== undefined) updateData.full_name = full_name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (phone !== undefined) updateData.phone = phone;

    updateData.updated_at = new Date().toISOString();

    const { data: user, error } = await supabase
      .from("Users")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur mise à jour utilisateur:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la mise à jour de l'utilisateur",
      });
    }

    res.status(200).json({
      success: true,
      message: "Utilisateur mis à jour avec succès",
      data: user,
    });
  } catch (error) {
    console.error("Erreur mise à jour utilisateur:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
};

/**
 * DELETE /admin/users/:id
 * Supprimer un utilisateur
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que l'utilisateur n'est pas admin
    const { data: user, error: userError } = await supabase
      .from("Users")
      .select("role")
      .eq("id", id)
      .single();

    if (userError) {
      console.error("Erreur vérification utilisateur:", userError);
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        error: "Impossible de supprimer un administrateur",
      });
    }

    const { error } = await supabase.from("Users").delete().eq("id", id);

    if (error) {
      console.error("Erreur suppression utilisateur:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la suppression de l'utilisateur",
      });
    }

    res.status(200).json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression utilisateur:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression de l'utilisateur",
    });
  }
};

/**
 * GET /admin/users/stats
 * Récupérer les statistiques des utilisateurs
 */
export const getUsersStats = async (req, res) => {
  try {
    // Compter les utilisateurs par rôle
    const { data: usersByRole, error: roleError } = await supabase
      .from("Users")
      .select("role");

    if (roleError) {
      console.error("Erreur stats utilisateurs:", roleError);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des statistiques",
      });
    }

    const stats = {
      admin: 0,
      user: 0,
      total: 0,
    };

    usersByRole?.forEach((user) => {
      stats.total++;
      if (user.role === "admin") {
        stats.admin++;
      } else {
        stats.user++;
      }
    });

    // Nouveaux utilisateurs par mois (6 derniers mois)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: newUsersData, error: newUsersError } = await supabase
      .from("Users")
      .select("created_at")
      .gte("created_at", sixMonthsAgo.toISOString());

    if (newUsersError) {
      console.error("Erreur nouveaux utilisateurs:", newUsersError);
    }

    const monthlyNewUsers = {};
    newUsersData?.forEach((user) => {
      const date = new Date(user.created_at);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyNewUsers[monthKey]) {
        monthlyNewUsers[monthKey] = 0;
      }
      monthlyNewUsers[monthKey]++;
    });

    res.status(200).json({
      success: true,
      data: {
        roleStats: stats,
        monthlyNewUsers: Object.entries(monthlyNewUsers).map(
          ([month, count]) => ({
            month,
            count,
          })
        ),
      },
    });
  } catch (error) {
    console.error("Erreur stats utilisateurs:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des statistiques",
    });
  }
};
