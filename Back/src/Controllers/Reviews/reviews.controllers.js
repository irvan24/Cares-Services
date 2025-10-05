// Contrôleur pour les avis
import { supabase } from "../../supabaseClient.js";

// Créer un nouvel avis
export const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id; // Supposé être dans req.user après authentification

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Vérifier si le produit existe
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Vérifier si l'utilisateur a déjà laissé un avis pour ce produit
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", userId)
      .single();

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Créer l'avis
    const { data: review, error: reviewError } = await supabase
      .from("reviews")
      .insert([
        {
          product_id: productId,
          user_id: userId,
          rating: rating,
          comment: comment || null,
        },
      ])
      .select()
      .single();

    if (reviewError) {
      console.error("Error creating review:", reviewError);
      return res.status(500).json({
        success: false,
        message: "Error creating review",
        error: reviewError.message,
      });
    }

    // Mettre à jour la note moyenne du produit
    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error in createReview:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Récupérer les avis d'un produit
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // Récupérer les avis avec les informations utilisateur
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        users:user_id (
          full_name,
          email
        )
      `
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching reviews",
        error: error.message,
      });
    }

    // Compter le total d'avis
    const { count, error: countError } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("product_id", productId);

    if (countError) {
      console.error("Error counting reviews:", countError);
    }

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in getProductReviews:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Supprimer un avis
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // Supposé être dans req.user après authentification

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Vérifier si l'avis existe et appartient à l'utilisateur
    const { data: review, error: fetchError } = await supabase
      .from("reviews")
      .select("id, product_id, user_id")
      .eq("id", id)
      .single();

    if (fetchError || !review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    // Supprimer l'avis
    const { error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting review:", deleteError);
      return res.status(500).json({
        success: false,
        message: "Error deleting review",
        error: deleteError.message,
      });
    }

    // Mettre à jour la note moyenne du produit
    await updateProductRating(review.product_id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteReview:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fonction utilitaire pour mettre à jour la note moyenne d'un produit
const updateProductRating = async (productId) => {
  try {
    // Calculer la note moyenne
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("rating")
      .eq("product_id", productId);

    if (reviewsError) {
      console.error("Error fetching reviews for rating update:", reviewsError);
      return;
    }

    if (reviews && reviews.length > 0) {
      const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;

      // Mettre à jour le produit
      const { error: updateError } = await supabase
        .from("products")
        .update({
          rating: Math.round(averageRating * 100) / 100, // Arrondir à 2 décimales
          reviews: reviews.length,
        })
        .eq("id", productId);

      if (updateError) {
        console.error("Error updating product rating:", updateError);
      }
    }
  } catch (error) {
    console.error("Error in updateProductRating:", error);
  }
};
