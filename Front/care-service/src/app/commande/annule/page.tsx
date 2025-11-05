"use client";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import {
  XCircleIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <XCircleIcon className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement annulé
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Votre paiement a été annulé. Aucun montant n'a été débité.
          </p>
          <p className="text-gray-600 mb-8">
            Si vous avez des questions ou rencontrez des problèmes lors du
            paiement, n'hésitez pas à nous contacter.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/panier"
              className="inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour au panier</span>
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Continuer mes achats</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
