"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PrinterIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function OrderDetail() {
  const [order] = useState({
    id: "#CMD-001",
    customer: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    date: "2025-01-15",
    status: "En cours",
    total: 89.97,
    shippingCost: 5.99,
    tax: 15.99,
    subtotal: 68.99,
    address: {
      street: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    products: [
      {
        id: 1,
        name: "Shampoing Carrosserie Premium",
        quantity: 2,
        price: 24.99,
        image: "/products/shampoing-carrosserie.jpg",
        category: "Lavage",
      },
      {
        id: 2,
        name: "Cire de Protection",
        quantity: 1,
        price: 39.99,
        image: "/products/cire-protection.jpg",
        category: "Protection",
      },
    ],
    notes: "Livraison préférée en fin d'après-midi",
    paymentMethod: "Virement bancaire",
    trackingNumber: "TRK123456789",
  });

  const [newStatus, setNewStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes);

  const statusOptions = [
    {
      value: "En attente",
      label: "En attente",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "En cours",
      label: "En cours",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "Expédiée",
      label: "Expédiée",
      color: "bg-purple-100 text-purple-800",
    },
    { value: "Livrée", label: "Livrée", color: "bg-green-100 text-green-800" },
    { value: "Annulée", label: "Annulée", color: "bg-red-100 text-red-800" },
  ];

  const handleStatusUpdate = () => {
    // Ici, vous mettriez à jour le statut via l'API
    alert(`Statut mis à jour: ${newStatus}`);
  };

  const handleNotesUpdate = () => {
    // Ici, vous mettriez à jour les notes via l'API
    alert("Notes mises à jour");
  };

  const sendEmail = () => {
    // Ici, vous enverriez un email au client
    alert("Email envoyé au client");
  };

  const printOrder = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href="/admin/commandes"
            className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour aux commandes</span>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Commande {order.id}
            </h1>
            <p className="text-gray-600 mt-2">
              Passée le {order.date} par {order.customer}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={printOrder}
              className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              <PrinterIcon className="w-5 h-5 mr-2" />
              Imprimer
            </button>
            <button
              onClick={sendEmail}
              className="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Envoyer email
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statut et actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Statut de la commande
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                className="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Mettre à jour
              </button>
            </div>
          </div>

          {/* Produits commandés */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Produits commandés
            </h2>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Catégorie: {product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantité: {product.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(product.price * product.quantity).toFixed(2)}€
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.price.toFixed(2)}€ × {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notes de commande
            </h2>
            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Ajoutez des notes pour cette commande..."
              />
              <button
                onClick={handleNotesUpdate}
                className="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Sauvegarder les notes
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informations client */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations client
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Nom</p>
                <p className="text-gray-900">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{order.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                <p className="text-gray-900">{order.phone}</p>
              </div>
            </div>
          </div>

          {/* Adresse de livraison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Adresse de livraison
            </h2>
            <div className="space-y-2">
              <p className="text-gray-900">{order.address.street}</p>
              <p className="text-gray-900">
                {order.address.postalCode} {order.address.city}
              </p>
              <p className="text-gray-900">{order.address.country}</p>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Résumé de commande
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-gray-900">
                  {order.subtotal.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="text-gray-900">
                  {order.shippingCost.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">TVA</span>
                <span className="text-gray-900">{order.tax.toFixed(2)}€</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{order.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Informations de paiement */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Paiement
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Méthode</p>
                <p className="text-gray-900">{order.paymentMethod}</p>
              </div>
              {order.trackingNumber && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Numéro de suivi
                  </p>
                  <p className="text-gray-900">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
