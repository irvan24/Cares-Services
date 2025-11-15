"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import {
  StarIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
  image_url?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductClientProps {
  product: Product | null;
  relatedProducts: Product[];
  initialError?: string | null;
}

export default function ProductClient({
  product,
  relatedProducts,
  initialError,
}: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  // Ajouter au panier
  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          ...product,
          inStock: product.stock > 0,
          rating: product.rating || 4.5,
          reviews: product.reviews || 0,
        },
        quantity
      );
      alert(`${quantity} article(s) ajouté(s) au panier !`);
    }
  };

  if (initialError || !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {initialError || "Produit introuvable"}
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à la boutique</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-cyan-500">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/boutique"
              className="text-gray-500 hover:text-cyan-500"
            >
              Boutique
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/boutique?category=${product.category.toLowerCase()}`}
              className="text-gray-500 hover:text-cyan-500"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Galerie d'images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Miniatures - Une seule image pour l'instant */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedImage(0)}
                className={`relative h-24 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === 0
                    ? "border-cyan-500 ring-2 ring-cyan-200"
                    : "border-gray-200 hover:border-cyan-300"
                }`}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} - Image principale`}
                  fill
                  className="object-cover"
                />
              </button>
            </div>
          </div>

          {/* Informations du produit */}
          <div>
            {/* Catégorie */}
            <div className="mb-4">
              <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Notes et avis */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 4.5)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating || 4.5} ({product.reviews || 0} avis)
              </span>
            </div>

            {/* Prix */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-cyan-600">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-gray-500">TTC</span>
              </div>
            </div>

            {/* Description courte */}
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Disponibilité */}
            <div className="flex items-center space-x-2 mb-8">
              {product.stock > 0 ? (
                <>
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  <span className="text-green-600 font-semibold">
                    Disponible - Expédition sous 24h
                  </span>
                </>
              ) : (
                <>
                  <span className="text-red-600 font-semibold">
                    Rupture de stock
                  </span>
                </>
              )}
            </div>

            {/* Sélecteur de quantité */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantité:
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-xl font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: {(product.price * quantity).toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-bold text-lg transition-colors ${
                  product.stock > 0
                    ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span>Ajouter au panier</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 hover:border-cyan-500 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors">
                <HeartIcon className="w-6 h-6" />
                <span>Ajouter aux favoris</span>
              </button>
            </div>

            {/* Garanties */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <TruckIcon className="w-6 h-6 text-cyan-600" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Livraison gratuite
                  </p>
                  <p className="text-sm text-gray-600">
                    Pour toute commande en France métropolitaine
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-6 h-6 text-cyan-600" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Garantie satisfait ou remboursé
                  </p>
                  <p className="text-sm text-gray-600">Retour sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-cyan-600" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Qualité garantie
                  </p>
                  <p className="text-sm text-gray-600">
                    Produits professionnels certifiés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs : Description, Caractéristiques, Avis */}
        <div className="bg-white rounded-2xl shadow-lg mb-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8 pt-6">
              <button className="pb-4 border-b-2 border-cyan-500 text-cyan-600 font-semibold">
                Description
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-900 font-semibold">
                Caractéristiques
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-900 font-semibold">
                Avis ({product.reviews || 0})
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Description détaillée */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Description détaillée
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Informations produit */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Informations produit
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium">
                      Catégorie:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium">Stock:</span>
                    <span className="text-gray-900 font-semibold">
                      {product.stock} unités
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium">Prix:</span>
                    <span className="text-gray-900 font-semibold">
                      {product.price.toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium">
                      Disponibilité:
                    </span>
                    <span
                      className={`font-semibold ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? "En stock" : "Rupture de stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produit/${relatedProduct.id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(relatedProduct.rating || 4.5)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {relatedProduct.rating || 4.5}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cyan-600">
                        {relatedProduct.price.toFixed(2)}€
                      </span>
                      <span className="text-sm text-cyan-600 font-semibold hover:underline">
                        Voir le produit →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Retour à la boutique */}
        <div className="text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à la boutique</span>
          </Link>
        </div>
      </div>
    </>
  );
}
