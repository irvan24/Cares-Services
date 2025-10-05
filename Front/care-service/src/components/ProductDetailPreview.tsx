"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../services/adminService";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ProductDetailPreviewProps {
  product: Product;
  onDelete?: (product: Product) => void;
}

export default function ProductDetailPreview({
  product,
  onDelete,
}: ProductDetailPreviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image du produit */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
          )}
        </div>
      </div>

      {/* Informations du produit */}
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-cyan-100 text-cyan-800">
              {product.category}
            </span>
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                product.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.is_active ? "Actif" : "Inactif"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Prix */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            €{product.price}
          </span>
        </div>

        {/* Stock */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Stock disponible
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {product.stock} unités
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                product.stock > 10
                  ? "bg-green-500"
                  : product.stock > 5
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min((product.stock / 20) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Informations du produit
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600">ID du produit</div>
              <div className="text-lg font-semibold text-gray-900">
                #{product.id}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600">Catégorie</div>
              <div className="text-lg font-semibold text-gray-900">
                {product.category}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600">Date de création</div>
              <div className="text-lg font-semibold text-gray-900">
                {new Date(product.created_at).toLocaleDateString("fr-FR")}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600">Dernière mise à jour</div>
              <div className="text-lg font-semibold text-gray-900">
                {new Date(product.updated_at).toLocaleDateString("fr-FR")}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Link
            href={`/admin/produits/${product.id}`}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-center"
          >
            Modifier le produit
          </Link>
          <button
            onClick={() => onDelete?.(product)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <TrashIcon className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
