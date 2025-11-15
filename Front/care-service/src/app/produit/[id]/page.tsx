import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import ProductClient, { Product } from "../../../components/ProductClient";

async function fetchProduct(
  productId: number
): Promise<{
  product: Product | null;
  relatedProducts: Product[];
  error: string | null;
}> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

    // Charger le produit spécifique
    const response = await fetch(`${API_URL}/products/${productId}`, {
      next: { revalidate: 120 }, // Cache pendant 2 minutes
    });

    if (!response.ok) {
      return {
        product: null,
        relatedProducts: [],
        error: "Erreur lors du chargement du produit",
      };
    }

    const data = await response.json();

    if (!data.success) {
      return {
        product: null,
        relatedProducts: [],
        error: data.error || "Erreur lors du chargement du produit",
      };
    }

    const productData: Product = {
      ...data.data,
      image:
        data.data.image_url || data.data.image || "/placeholder-product.jpg",
      category: data.data.category || "Général",
      inStock: data.data.stock > 0,
      rating: 4.5,
      reviews: 0,
    };

    // Charger les produits similaires (même catégorie)
    let relatedProducts: Product[] = [];
    try {
      const relatedResponse = await fetch(`${API_URL}/products`, {
        next: { revalidate: 120 },
      });

      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        if (relatedData.success) {
          relatedProducts = relatedData.data
            .filter(
              (p: Product) =>
                p.id !== productId && p.category === productData.category
            )
            .slice(0, 3)
            .map((p: Product) => ({
              ...p,
              image: p.image_url || p.image || "/placeholder-product.jpg",
              category: p.category || "Général",
              inStock: p.stock > 0,
              rating: 4.5,
              reviews: 0,
            }));
        }
      }
    } catch (err) {
      // Ignorer les erreurs pour les produits similaires
      console.error("Erreur lors du chargement des produits similaires:", err);
    }

    return {
      product: productData,
      relatedProducts,
      error: null,
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      product: null,
      relatedProducts: [],
      error:
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors du chargement",
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <ProductClient
          product={null}
          relatedProducts={[]}
          initialError="ID de produit invalide"
        />
        <Footer />
      </div>
    );
  }

  const { product, relatedProducts, error } = await fetchProduct(productId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductClient
        product={product}
        relatedProducts={relatedProducts}
        initialError={error}
      />
      <Footer />
    </div>
  );
}
