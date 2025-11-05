"use client";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useCart, CartItem } from "../../contexts/CartContext";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function PanierPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();

  // Utiliser directement les items du panier (ils contiennent déjà toutes les infos nécessaires)
  const cartItems: CartItem[] = cart;

  // Calculer les frais de livraison
  const deliveryFee = cartTotal > 50 ? 0 : 4.99;
  const totalWithDelivery = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/boutique"
              className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour à la boutique</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Mon Panier</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          // Panier vide
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits d'entretien automobile de qualité
              professionnelle
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Commencer mes achats</span>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Articles ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Image */}
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-xs text-gray-600">IMG</span>
                            </div>
                          )}
                        </div>

                        {/* Détails */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.category}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xl font-bold text-cyan-600">
                              {item.price.toFixed(2)}€
                            </span>
                          </div>
                        </div>

                        {/* Contrôles de quantité */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Prix total et suppression */}
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900">
                            {(item.price * item.quantity).toFixed(2)}€
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bouton vider le panier */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Résumé de commande
                </h2>

                {/* Détail des prix */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold text-black">
                      {cartTotal.toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold text-black">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `${deliveryFee.toFixed(2)}€`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total TTC
                      </span>
                      <span className="text-lg font-bold text-cyan-600">
                        {totalWithDelivery.toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <Link
                    href="/commande"
                    className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-colors text-center"
                  >
                    Finaliser la commande
                  </Link>
                  <Link
                    href="/boutique"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continuer mes achats
                  </Link>
                </div>

                {/* Garanties */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Livraison gratuite dès 50€</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Retour sous 30 jours</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
