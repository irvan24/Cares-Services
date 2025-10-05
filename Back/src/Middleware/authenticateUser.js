import { supabase } from "../supabaseClient.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Token manquant ou format incorrect",
      });
    }

    const token = authHeader.split(" ")[1];

    // Vérifier si c'est un token admin personnalisé (format base64)
    try {
      // Décoder le token simple
      const decoded = Buffer.from(token, "base64").toString("utf-8");

      // Vérifier si le token décodé contient un ':' (format admin: userId:timestamp)
      if (decoded.includes(":")) {
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

        // Récupérer les informations de l'utilisateur admin
        const { data: userData, error } = await supabase
          .from("Users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error || !userData) {
          return res.status(401).json({
            success: false,
            error: "Utilisateur non trouvé",
          });
        }

        // Vérifier que l'utilisateur est admin
        if (userData.role !== "admin") {
          return res.status(403).json({
            success: false,
            error: "Accès réservé aux administrateurs",
          });
        }

        req.user = userData;
        next();
        return;
      }
    } catch (decodeError) {
      // Si le décodage échoue, ce n'est pas un token admin, continuer avec Supabase Auth
    }

    // Si ce n'est pas un token admin, essayer avec Supabase Auth
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: "Token invalide ou expiré",
        details: error?.message,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur middleware auth:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur d'authentification",
      details: error.message,
    });
  }
};
