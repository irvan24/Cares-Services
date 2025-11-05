"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { useCart } from "../../../contexts/CartContext";
import {
  CheckCircleIcon,
  TruckIcon,
  EnvelopeIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // Vider le panier après un paiement réussi
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Message de succès */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Merci pour votre achat. Votre paiement a été traité avec succès.
            </p>

            {sessionId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">ID de session:</span>{" "}
                  {sessionId}
                </p>
              </div>
            )}
          </div>

          {/* Informations de suivi */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Prochaines étapes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="w-6 h-6 text-cyan-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email de confirmation
                  </h3>
                  <p className="text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails
                    de votre commande dans les prochaines minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TruckIcon className="w-6 h-6 text-cyan-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Livraison</h3>
                  <p className="text-gray-600">
                    Nous préparons votre commande et vous recevrez un email avec
                    les informations de suivi une fois l'expédition effectuée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/boutique"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Continuer mes achats</span>
            </Link>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>

        {/* Garanties */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Vos garanties
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Paiement sécurisé
              </h3>
              <p className="text-sm text-gray-600">
                Votre transaction est 100% sécurisée
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TruckIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Livraison rapide
              </h3>
              <p className="text-sm text-gray-600">Expédition sous 24-48h</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircleIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Retour gratuit
              </h3>
              <p className="text-sm text-gray-600">
                Retour possible sous 30 jours
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
