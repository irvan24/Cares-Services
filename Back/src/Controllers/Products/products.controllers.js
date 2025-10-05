import { supabase } from "../../supabaseClient.js";

/**
 * GET /products
 * Public – Liste tous les produits
 */
export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des produits",
      });
    }

    // Mapper les données pour correspondre au frontend
    const mappedData = (data || []).map((product) => ({
      ...product,
      image: product.image_url || product.image || "/placeholder-product.jpg",
      inStock: product.stock > 0,
      rating: 4.5, // Valeur par défaut
      reviews: 0, // Valeur par défaut
    }));

    res.status(200).json({
      success: true,
      data: mappedData,
      count: mappedData.length,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * GET /products/:id
 * Public – Récupère un produit par ID
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      return res.status(404).json({
        success: false,
        error: "Produit introuvable",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * POST /products
 * Admin – Crée un nouveau produit
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      long_description,
      price,
      category,
      rating,
      reviews,
      in_stock,
      badge,
      image,
      images,
      features,
      specifications,
    } = req.body;

    // Validation des champs obligatoires
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        error: "Les champs nom, description et prix sont obligatoires",
      });
    }

    // Préparer les données pour l'insertion
    const productData = {
      name,
      description,
      long_description: long_description || description,
      price: parseFloat(price),
      category,
      rating: rating ? parseFloat(rating) : 0,
      reviews: reviews ? parseInt(reviews) : 0,
      in_stock: in_stock !== undefined ? in_stock : true,
      badge: badge || null,
      image: image || null,
      images: images ? JSON.stringify(images) : null,
      features: features ? JSON.stringify(features) : null,
      specifications: specifications ? JSON.stringify(specifications) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("Products")
      .insert([productData])
      .select("*")
      .single();

    if (error) {
      console.error("Erreur lors de la création du produit:", error);
      return res.status(400).json({
        success: false,
        error: "Erreur lors de la création du produit",
      });
    }

    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      data,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * PUT /products/:id
 * Admin – Met à jour un produit
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      long_description,
      price,
      category,
      rating,
      reviews,
      in_stock,
      badge,
      image,
      images,
      features,
      specifications,
    } = req.body;

    // Vérifier que le produit existe
    const { data: existingProduct, error: fetchError } = await supabase
      .from("Products")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Produit introuvable",
      });
    }

    // Préparer les données de mise à jour
    const updateData = {
      updated_at: new Date().toISOString(),
    };

    // Ajouter seulement les champs fournis
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (long_description !== undefined)
      updateData.long_description = long_description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (category !== undefined) updateData.category = category;
    if (rating !== undefined) updateData.rating = parseFloat(rating);
    if (reviews !== undefined) updateData.reviews = parseInt(reviews);
    if (in_stock !== undefined) updateData.in_stock = in_stock;
    if (badge !== undefined) updateData.badge = badge;
    if (image !== undefined) updateData.image = image;
    if (images !== undefined)
      updateData.images = images ? JSON.stringify(images) : null;
    if (features !== undefined)
      updateData.features = features ? JSON.stringify(features) : null;
    if (specifications !== undefined)
      updateData.specifications = specifications
        ? JSON.stringify(specifications)
        : null;

    const { data, error } = await supabase
      .from("Products")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      return res.status(400).json({
        success: false,
        error: "Erreur lors de la mise à jour du produit",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produit mis à jour avec succès",
      data,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * DELETE /products/:id
 * Admin – Supprime un produit
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que le produit existe
    const { data: existingProduct, error: fetchError } = await supabase
      .from("Products")
      .select("id, name")
      .eq("id", id)
      .single();

    if (fetchError || !existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Produit introuvable",
      });
    }

    const { error } = await supabase.from("Products").delete().eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la suppression du produit",
      });
    }

    res.status(200).json({
      success: true,
      message: `Produit "${existingProduct.name}" supprimé avec succès`,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * GET /products/categories
 * Public – Liste toutes les catégories
 */
export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des catégories",
      });
    }

    res.status(200).json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

/**
 * POST /products/categories
 * Admin – Crée une nouvelle catégorie
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom de la catégorie est obligatoire",
      });
    }

    const { data, error } = await supabase
      .from("Categories")
      .insert([
        {
          name,
          description: description || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la création de la catégorie:", error);
      return res.status(400).json({
        success: false,
        error: "Erreur lors de la création de la catégorie",
      });
    }

    res.status(201).json({
      success: true,
      message: "Catégorie créée avec succès",
      data,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
