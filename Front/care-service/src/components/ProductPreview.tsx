"use client";
import { useState } from "react";
import Image from "next/image";
import {
  HeartIcon,
  ShoppingCartIcon,
  CheckIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface ProductPreviewProps {
  formData: {
    name: string;
    description: string;
    price: string;
    category: string;
    badge: string;
    stock: string;
    image: File | null;
  };
}

export default function ProductPreview({ formData }: ProductPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const totalPrice = (parseFloat(formData.price) * quantity).toFixed(2);

  // Images simulées pour la preview
  const previewImages = [
    formData.image
      ? URL.createObjectURL(formData.image)
      : "/placeholder-product.jpg",
    "/placeholder-product-2.jpg",
    "/placeholder-product-3.jpg",
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Aperçu du produit
      </h3>

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>
          Accueil / Boutique / {formData.category} / {formData.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          {/* Image principale */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={previewImages[selectedImage]}
              alt={formData.name}
              fill
              className="object-cover"
            />
            {formData.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formData.badge}
                </span>
              </div>
            )}
          </div>

          {/* Miniatures */}
          <div className="flex space-x-2">
            {previewImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-cyan-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`Vue ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          {/* Catégorie */}
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
              {formData.category}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>

          {/* Note et avis */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">4.8 (156 avis)</span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-cyan-600">
              {formData.price}€
            </span>
            <span className="text-sm text-gray-500">TTC</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {formData.description}
          </p>

          {/* Stock */}
          <div className="flex items-center space-x-2">
            <CheckIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">
              En stock - Expédition sous 24h
            </span>
          </div>

          {/* Quantité */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantité:
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-16 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="text-lg font-semibold text-gray-900">
            Total: {totalPrice}€
          </div>

          {/* Boutons d'action */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Ajouter au panier</span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-4 py-3 rounded-lg border transition-colors flex items-center justify-center ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <HeartIcon
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Garanties */}
          <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Livraison gratuite
                </div>
                <div className="text-sm text-gray-500">
                  Pour toute commande en France métropolitaine
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <ArrowPathIcon className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Garantie satisfait ou remboursé
                </div>
                <div className="text-sm text-gray-500">
                  Retour sous 30 jours
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Qualité garantie
                </div>
                <div className="text-sm text-gray-500">
                  Produits professionnels certifiés
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
