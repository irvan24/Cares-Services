// Contrôleur pour les catégories
import { supabase } from "../../supabaseClient.js";

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching categories",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Créer une nouvelle catégorie
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Vérifier si la catégorie existe déjà
    const { data: existingCategory } = await supabase
      .from("categories")
      .select("id")
      .eq("name", name)
      .single();

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Créer la nouvelle catégorie
    const { data: category, error } = await supabase
      .from("categories")
      .insert([
        {
          name: name,
          description: description || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating category",
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Vérifier si la catégorie existe
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("id, name")
      .eq("id", id)
      .single();

    if (fetchError || !category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Vérifier s'il y a des produits dans cette catégorie
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id")
      .eq("category", category.name)
      .limit(1);

    if (productsError) {
      console.error("Error checking products:", productsError);
      return res.status(500).json({
        success: false,
        message: "Error checking category usage",
        error: productsError.message,
      });
    }

    if (products && products.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete category with existing products",
      });
    }

    // Supprimer la catégorie
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting category:", deleteError);
      return res.status(500).json({
        success: false,
        message: "Error deleting category",
        error: deleteError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
