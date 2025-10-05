"use client";
import { useState } from "react";

export default function AdminStatistics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30j");

  const periods = [
    { value: "7j", label: "7 derniers jours" },
    { value: "30j", label: "30 derniers jours" },
    { value: "90j", label: "90 derniers jours" },
    { value: "1a", label: "1 an" },
  ];

  // Données simulées des statistiques
  const stats = {
    revenue: {
      current: 2847.5,
      previous: 2156.3,
      change: 32.1,
    },
    orders: {
      current: 156,
      previous: 124,
      change: 25.8,
    },
    customers: {
      current: 89,
      previous: 76,
      change: 17.1,
    },
    products: {
      current: 24,
      previous: 22,
      change: 9.1,
    },
  };

  const topProducts = [
    { name: "Shampoing Carrosserie", sales: 45, revenue: 1124.55 },
    { name: "Cire de Protection", sales: 32, revenue: 1279.68 },
    { name: "Nettoyant Jantes", sales: 28, revenue: 475.72 },
    { name: "Protecteur Cuir", sales: 22, revenue: 659.78 },
    { name: "Nettoyant Vitres", sales: 18, revenue: 233.82 },
  ];

  const recentActivity = [
    {
      type: "order",
      description: "Nouvelle commande #CMD-001",
      amount: "89.97€",
      time: "Il y a 2 minutes",
    },
    {
      type: "user",
      description: "Nouvel utilisateur inscrit",
      user: "Jean Dupont",
      time: "Il y a 15 minutes",
    },
    {
      type: "product",
      description: "Produit ajouté",
      product: "Kit Complet Lavage",
      time: "Il y a 1 heure",
    },
    {
      type: "order",
      description: "Commande livrée #CMD-002",
      amount: "16.99€",
      time: "Il y a 2 heures",
    },
  ];

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? "↗" : "↘";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
            <p className="text-gray-600 mt-2">
              Analysez les performances de votre boutique
            </p>
          </div>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Chiffre d'affaires
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.revenue.current.toFixed(2)}€
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-medium ${getChangeColor(
                  stats.revenue.change
                )}`}
              >
                {getChangeIcon(stats.revenue.change)}{" "}
                {Math.abs(stats.revenue.change)}%
              </div>
              <p className="text-xs text-gray-500">vs période précédente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Commandes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.orders.current}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-medium ${getChangeColor(
                  stats.orders.change
                )}`}
              >
                {getChangeIcon(stats.orders.change)}{" "}
                {Math.abs(stats.orders.change)}%
              </div>
              <p className="text-xs text-gray-500">vs période précédente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Clients</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.customers.current}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-medium ${getChangeColor(
                  stats.customers.change
                )}`}
              >
                {getChangeIcon(stats.customers.change)}{" "}
                {Math.abs(stats.customers.change)}%
              </div>
              <p className="text-xs text-gray-500">vs période précédente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Produits</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.products.current}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-medium ${getChangeColor(
                  stats.products.change
                )}`}
              >
                {getChangeIcon(stats.products.change)}{" "}
                {Math.abs(stats.products.change)}%
              </div>
              <p className="text-xs text-gray-500">vs période précédente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top produits */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Top produits
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.map((product, index) => (
              <div key={product.name} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-cyan-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} ventes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {product.revenue.toFixed(2)}€
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Activité récente
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-gray-600">
                        {activity.type === "order"
                          ? "📦"
                          : activity.type === "user"
                          ? "👤"
                          : "🛍️"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      {activity.amount && (
                        <p className="text-xs text-cyan-600">
                          {activity.amount}
                        </p>
                      )}
                      {activity.user && (
                        <p className="text-xs text-gray-500">{activity.user}</p>
                      )}
                      {activity.product && (
                        <p className="text-xs text-gray-500">
                          {activity.product}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
