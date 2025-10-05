"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useCart } from "../../contexts/CartContext";
import {
  StarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export default function BoutiquePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Tous",
    "Intérieur",
    "Extérieur",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.data || []);

          // Garder les catégories fixes
          setCategories(["Tous", "Intérieur", "Extérieur"]);
        } else {
          throw new Error(
            data.error || "Erreur lors du chargement des produits"
          );
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Tous" ||
      (selectedCategory === "Intérieur" && product.category === "Intérieur") ||
      (selectedCategory === "Extérieur" && product.category === "Extérieur");
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Barre de recherche et filtres */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            {/* Barre de recherche */}
            <div className="relative w-full max-w-2xl">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Catégories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5" />
                <span>Catégories</span>
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-cyan-500 text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grille de produits */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading
                  ? "Chargement..."
                  : `${filteredProducts.length} produit${
                      filteredProducts.length > 1 ? "s" : ""
                    }`}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Erreur: {error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucun produit trouvé pour cette recherche.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produit/${product.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image du produit */}
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={product.image || "/placeholder-product.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                            Rupture de stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Stock */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            product.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock > 0
                            ? "Disponible"
                            : "Rupture de stock"}
                        </span>
                      </div>

                      {/* Prix et bouton */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-bold text-cyan-600">
                          {product.price.toFixed(2)}€
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({
                              ...product,
                              inStock: product.stock > 0,
                              rating: 4.5, // Valeur par défaut
                              reviews: 0, // Valeur par défaut
                            });
                          }}
                          disabled={product.stock === 0}
                          className={`px-5 py-2.5 rounded-lg transition-colors font-medium ${
                            product.stock > 0
                              ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {product.stock > 0 ? "Ajouter" : "Indisponible"}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
