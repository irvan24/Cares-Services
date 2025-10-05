"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function UserDetail() {
  const [user] = useState({
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    role: "Client",
    status: "Actif",
    joinDate: "2024-12-15",
    lastLogin: "2025-01-15",
    address: {
      street: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
    ordersCount: 3,
    totalSpent: 156.99,
    averageOrderValue: 52.33,
    orders: [
      {
        id: "#CMD-001",
        date: "2025-01-15",
        status: "En cours",
        total: 89.97,
        products: 2,
      },
      {
        id: "#CMD-002",
        date: "2025-01-10",
        status: "Livrée",
        total: 45.99,
        products: 1,
      },
      {
        id: "#CMD-003",
        date: "2024-12-20",
        status: "Livrée",
        total: 21.03,
        products: 1,
      },
    ],
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
  });

  const handleSave = () => {
    // Ici, vous sauvegarderiez les modifications
    alert("Utilisateur modifié avec succès !");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setIsEditing(false);
  };

  const sendEmail = () => {
    // Ici, vous enverriez un email à l'utilisateur
    alert(`Email envoyé à ${user.email}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800";
      case "Inactif":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Client":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href="/admin/utilisateurs"
            className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour aux utilisateurs</span>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-600">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={sendEmail}
              className="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Envoyer email
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              {isEditing ? "Annuler" : "Modifier"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations personnelles
            </h2>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rôle
                    </label>
                    <select
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="Client">Client</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Nom complet
                  </p>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rôle</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Dernière connexion
                  </p>
                  <p className="text-gray-900">{user.lastLogin}</p>
                </div>
              </div>
            )}
          </div>

          {/* Commandes récentes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Commandes récentes
            </h2>
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                      <ShoppingBagIcon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {order.products} produit{order.products > 1 ? "s" : ""}{" "}
                        • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {order.total.toFixed(2)}€
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Livrée"
                          ? "bg-green-100 text-green-800"
                          : order.status === "En cours"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/admin/commandes"
                className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                Voir toutes les commandes →
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Statistiques
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Commandes totales</span>
                <span className="font-semibold text-gray-900">
                  {user.ordersCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total dépensé</span>
                <span className="font-semibold text-gray-900">
                  {user.totalSpent.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Panier moyen</span>
                <span className="font-semibold text-gray-900">
                  {user.averageOrderValue.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Adresse
            </h2>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-900">{user.address.street}</p>
                  <p className="text-gray-900">
                    {user.address.postalCode} {user.address.city}
                  </p>
                  <p className="text-gray-900">{user.address.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations d'inscription */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations d'inscription
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Membre depuis
                  </p>
                  <p className="text-gray-900">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Préférences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Préférences
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Newsletter</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.preferences.newsletter
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.preferences.newsletter ? "Activé" : "Désactivé"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notifications email</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.preferences.emailNotifications
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.preferences.emailNotifications ? "Activé" : "Désactivé"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notifications SMS</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.preferences.smsNotifications
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.preferences.smsNotifications ? "Activé" : "Désactivé"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
