import { supabaseAdmin } from "../supabaseAdminClient.js";
import cloudinary from "../config/cloudinary.js";

/**
 * GET /admin/products
 * Récupérer tous les produits avec pagination
 */
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category = "" } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from("Products")
      .select("*")
      .order("created_at", { ascending: false });

    // Filtre par recherche
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filtre par catégorie
    if (category) {
      query = query.eq("category", category);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: products, error, count } = await query;

    if (error) {
      console.error("Erreur récupération produits:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des produits",
      });
    }

    // Compter le total pour la pagination
    let countQuery = supabaseAdmin
      .from("Products")
      .select("*", { count: "exact", head: true });

    if (search) {
      countQuery = countQuery.or(
        `name.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    if (category) {
      countQuery = countQuery.eq("category", category);
    }

    const { count: totalCount } = await countQuery;

    res.status(200).json({
      success: true,
      data: {
        products:
          products?.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price) || 0,
            stock: product.stock || 0,
            image: product.image_url,
            category: product.category || "Général", // Utiliser la vraie catégorie du produit
            is_active: true, // Valeur par défaut
            created_at: product.created_at,
            updated_at: product.created_at,
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
    console.error("Erreur récupération produits:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des produits",
    });
  }
};

/**
 * GET /admin/products/:id
 * Récupérer un produit par ID
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabaseAdmin
      .from("Products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur récupération produit:", error);
      return res.status(404).json({
        success: false,
        error: "Produit non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price) || 0,
        stock: product.stock || 0,
        image: product.image_url,
        category: product.category || "Général", // Utiliser la vraie catégorie du produit
        is_active: true, // Valeur par défaut
        created_at: product.created_at,
        updated_at: product.created_at,
      },
    });
  } catch (error) {
    console.error("Erreur récupération produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération du produit",
    });
  }
};

/**
 * POST /admin/products
 * Créer un nouveau produit
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      is_active = true,
    } = req.body;

    // Validation des données
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        error: "Le nom et le prix sont requis",
      });
    }

    // Gérer l'upload d'image vers Cloudinary si présent
    let imageUrl = "";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "care-services/products",
          resource_type: "auto",
          transformation: [
            { width: 800, height: 800, crop: "limit", quality: "auto" },
          ],
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Erreur upload image Cloudinary:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Erreur lors de l'upload de l'image",
        });
      }
    }

    const productData = {
      name,
      description: description || "",
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      image_url: imageUrl,
      category: category || "Général",
      created_at: new Date().toISOString(),
    };

    const { data: product, error } = await supabaseAdmin
      .from("Products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("Erreur Supabase:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la création du produit",
        details: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      data: product,
    });
  } catch (error) {
    console.error("Erreur création produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la création du produit",
      details: error.message,
    });
  }
};

/**
 * PUT /admin/products/:id
 * Mettre à jour un produit
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, image, category, is_active } =
      req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) {
      updateData.category = category;
    }
    if (is_active !== undefined) updateData.is_active = Boolean(is_active);

    // Si une nouvelle image est fournie via multer, uploader vers Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "care-services/products",
          resource_type: "auto",
          transformation: [
            { width: 800, height: 800, crop: "limit", quality: "auto" },
          ],
        });
        updateData.image_url = result.secure_url;

        // Supprimer l'ancienne image de Cloudinary si elle existe
        const { data: existingProduct } = await supabaseAdmin
          .from("Products")
          .select("image_url")
          .eq("id", id)
          .single();

        if (
          existingProduct?.image_url &&
          existingProduct.image_url.includes("cloudinary")
        ) {
          try {
            const publicId = existingProduct.image_url
              .split("/")
              .pop()
              .split(".")[0];
            await cloudinary.uploader.destroy(
              `care-services/products/${publicId}`
            );
          } catch (cloudinaryError) {
            console.error(
              "Erreur suppression ancienne image:",
              cloudinaryError
            );
          }
        }
      } catch (uploadError) {
        console.error("Erreur upload nouvelle image:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Erreur lors de l'upload de la nouvelle image",
        });
      }
    }

    updateData.updated_at = new Date().toISOString();

    const { data: product, error } = await supabaseAdmin
      .from("Products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur mise à jour produit:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la mise à jour du produit",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produit mis à jour avec succès",
      data: product,
    });
  } catch (error) {
    console.error("Erreur mise à jour produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour du produit",
    });
  }
};

/**
 * DELETE /admin/products/:id
 * Supprimer un produit
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer le produit pour obtenir l'image_url
    const { data: product, error: fetchError } = await supabaseAdmin
      .from("Products")
      .select("id, name, image_url")
      .eq("id", id)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({
        success: false,
        error: "Produit introuvable",
      });
    }

    // Supprimer l'image de Cloudinary si elle existe
    if (product.image_url && product.image_url.includes("cloudinary")) {
      try {
        // Extraire le public_id de l'URL Cloudinary
        const publicId = product.image_url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`care-services/products/${publicId}`);
      } catch (cloudinaryError) {
        console.error("Erreur suppression image Cloudinary:", cloudinaryError);
        // Continue même si la suppression de l'image échoue
      }
    }

    const { error } = await supabaseAdmin
      .from("Products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erreur suppression produit:", error);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la suppression du produit",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression du produit",
    });
  }
};

// Upload d'image vers Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Aucun fichier image fourni",
      });
    }

    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "care-services/products",
      resource_type: "auto",
      transformation: [
        { width: 800, height: 800, crop: "limit", quality: "auto" },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Image uploadée avec succès",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Erreur upload image Cloudinary:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'upload de l'image",
    });
  }
};
