import { supabase } from "../supabaseClient.js";

/**
 * GET /admin/categories
 * Récupérer toutes les catégories
 */
export const getAllCategories = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("Categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Erreur récupération catégories:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des catégories",
      });
    }

    res.status(200).json({
      success: true,
      data:
        categories?.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })) || [],
    });
  } catch (error) {
    console.error("Erreur récupération catégories:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des catégories",
    });
  }
};

/**
 * GET /admin/categories/:id
 * Récupérer une catégorie par ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: category, error } = await supabase
      .from("Categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur récupération catégorie:", error);
      return res.status(404).json({
        success: false,
        error: "Catégorie non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
        updated_at: category.updated_at,
      },
    });
  } catch (error) {
    console.error("Erreur récupération catégorie:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de la catégorie",
    });
  }
};

/**
 * POST /admin/categories
 * Créer une nouvelle catégorie
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation des données
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom de la catégorie est requis",
      });
    }

    const { data: category, error } = await supabase
      .from("Categories")
      .insert([
        {
          name,
          description: description || "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Erreur création catégorie:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la création de la catégorie",
      });
    }

    res.status(201).json({
      success: true,
      message: "Catégorie créée avec succès",
      data: category,
    });
  } catch (error) {
    console.error("Erreur création catégorie:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la création de la catégorie",
    });
  }
};

/**
 * PUT /admin/categories/:id
 * Mettre à jour une catégorie
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    updateData.updated_at = new Date().toISOString();

    const { data: category, error } = await supabase
      .from("Categories")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur mise à jour catégorie:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la mise à jour de la catégorie",
      });
    }

    res.status(200).json({
      success: true,
      message: "Catégorie mise à jour avec succès",
      data: category,
    });
  } catch (error) {
    console.error("Erreur mise à jour catégorie:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour de la catégorie",
    });
  }
};

/**
 * DELETE /admin/categories/:id
 * Supprimer une catégorie
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier qu'aucun produit n'utilise cette catégorie
    const { data: products, error: productsError } = await supabase
      .from("Products")
      .select("id")
      .eq("category_id", id)
      .limit(1);

    if (productsError) {
      console.error("Erreur vérification produits:", productsError);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la vérification des produits",
      });
    }

    if (products && products.length > 0) {
      return res.status(400).json({
        success: false,
        error:
          "Impossible de supprimer une catégorie qui contient des produits",
      });
    }

    const { error } = await supabase.from("Categories").delete().eq("id", id);

    if (error) {
      console.error("Erreur suppression catégorie:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la suppression de la catégorie",
      });
    }

    res.status(200).json({
      success: true,
      message: "Catégorie supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression catégorie:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression de la catégorie",
    });
  }
};
