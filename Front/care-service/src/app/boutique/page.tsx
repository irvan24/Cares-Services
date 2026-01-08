import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import BoutiqueClient, { Product } from "../../components/BoutiqueClient";

// Force la page à être dynamique pour éviter les timeouts lors du build statique
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchProducts(): Promise<{
  products: Product[];
  error: string | null;
}> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL n'est pas configuré");
    }

    // Ajout d'un timeout pour éviter les blocages lors du build
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes max

    try {
      const response = await fetch(`${API_URL}/products`, {
        next: { revalidate: 120 },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Erreur lors du chargement des produits");
      }

      return { products: data.data || [], error: null };
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        throw new Error("Timeout: L'API a pris trop de temps à répondre");
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return {
      products: [],
      error:
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors du chargement",
    };
  }
}

export default async function BoutiquePage() {
  const { products, error } = await fetchProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BoutiqueClient initialProducts={products} initialError={error} />
      <Footer />
    </div>
  );
}
