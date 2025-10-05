import { supabase } from "../supabaseClient.js";

/**
 * POST /auth/admin/login
 * Authentification spécifique pour les administrateurs
 */
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier d'abord si l'utilisateur est un admin
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select("id, full_name, role")
      .eq("email", email)
      .eq("role", "admin")
      .single();

    if (userError || !userData) {
      return res.status(401).json({
        success: false,
        error: "Accès non autorisé. Identifiants administrateur requis.",
      });
    }

    // Authentifier avec Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: "Identifiants incorrects",
      });
    }

    // Générer un token simple (en production, utilisez JWT)
    const adminToken = Buffer.from(`${userData.id}:${Date.now()}`).toString(
      "base64"
    );

    res.status(200).json({
      success: true,
      message: "Connexion administrateur réussie",
      user: {
        id: userData.id,
        email: data.user.email,
        name: userData.full_name,
        role: "admin",
      },
      token: adminToken,
      session: data.session,
    });
  } catch (err) {
    console.error("Erreur admin login:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * POST /auth/admin/verify
 * Vérifier le token administrateur
 */
export const verifyAdminToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token manquant",
      });
    }

    // Décoder le token simple
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId, timestamp] = decoded.split(":");

    // Vérifier que le token n'est pas trop ancien (24h)
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 heures

    if (tokenAge > maxAge) {
      return res.status(401).json({
        success: false,
        error: "Token expiré",
      });
    }

    // Vérifier que l'utilisateur existe toujours et est admin
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select("id, full_name, role, email")
      .eq("id", userId)
      .eq("role", "admin")
      .single();

    if (userError || !userData) {
      return res.status(401).json({
        success: false,
        error: "Token invalide",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.full_name,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Erreur token verification:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * POST /auth/admin/logout
 * Déconnexion administrateur
 */
export const adminLogout = async (req, res) => {
  try {
    // En production, vous pourriez invalider le token côté serveur
    // Pour l'instant, on retourne juste un succès
    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (err) {
    console.error("Erreur admin logout:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
