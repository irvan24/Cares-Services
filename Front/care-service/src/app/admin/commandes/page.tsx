"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ordersService, Order } from "../../../services/adminService";

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les commandes
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersService.getAll({ page: 1, limit: 50 });
        setOrders(response.data || []);
      } catch (err) {
        setError("Erreur lors du chargement des commandes");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-900">Chargement des commandes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // Données simulées des commandes (fallback)
  const fallbackOrders = [
    {
      id: "#CMD-001",
      customer: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78",
      products: [
        { name: "Shampoing Carrosserie", quantity: 2, price: 24.99 },
        { name: "Cire de Protection", quantity: 1, price: 39.99 },
      ],
      total: 89.97,
      status: "En cours",
      date: "2025-01-15",
      address: "123 Rue de la Paix, 75001 Paris",
    },
    {
      id: "#CMD-002",
      customer: "Marie Martin",
      email: "marie.martin@email.com",
      phone: "06 87 65 43 21",
      products: [{ name: "Nettoyant Jantes", quantity: 1, price: 16.99 }],
      total: 16.99,
      status: "Livrée",
      date: "2025-01-14",
      address: "456 Avenue des Champs, 69000 Lyon",
    },
    {
      id: "#CMD-003",
      customer: "Pierre Durand",
      email: "pierre.durand@email.com",
      phone: "06 11 22 33 44",
      products: [
        { name: "Protecteur Cuir", quantity: 1, price: 29.99 },
        { name: "Nettoyant Vitres", quantity: 3, price: 12.99 },
      ],
      total: 68.96,
      status: "En attente",
      date: "2025-01-13",
      address: "789 Boulevard Saint-Germain, 13000 Marseille",
    },
    {
      id: "#CMD-004",
      customer: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      phone: "06 55 66 77 88",
      products: [{ name: "Kit Complet Lavage", quantity: 1, price: 89.99 }],
      total: 89.99,
      status: "Annulée",
      date: "2025-01-12",
      address: "321 Rue de Rivoli, 31000 Toulouse",
    },
  ];

  const statuses = ["Tous", "pending", "processing", "completed"];

  // Filtrer les commandes
  const allOrders = orders.length > 0 ? orders : fallbackOrders;
  const filteredOrders = allOrders.filter((order) => {
    const orderId = typeof order.id === "string" ? order.id : `#${order.id}`;
    const customerName = order.customer?.name || order.customer || "";
    const customerEmail = order.customer?.email || order.email || "";

    const matchesSearch =
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "Tous" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminée";
      case "processing":
        return "En cours";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-white text-gray-900 placeholder-gray-500 rounded-xl px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-300"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a10 10 0 0120 0v5z"
                  />
                </svg>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">IA</span>
              </div>
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Liste des commandes
          </h1>
        </div>

        {/* Cartes de statut des commandes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {(() => {
            const totalOrders = allOrders.length;
            const pendingCount = allOrders.filter(
              (o) => o.status === "pending"
            ).length;
            const processingCount = allOrders.filter(
              (o) => o.status === "processing"
            ).length;
            const completedCount = allOrders.filter(
              (o) => o.status === "completed"
            ).length;
            const cancelledCount = allOrders.filter(
              (o) => o.status === "cancelled"
            ).length;

            return [
              {
                status: "pending",
                label: "Nouvelles commandes",
                count: pendingCount,
                color: "bg-white",
                change:
                  totalOrders > 0
                    ? `${((pendingCount / totalOrders) * 100).toFixed(1)}%`
                    : "0%",
                textColor: "text-gray-900",
                iconColor: "bg-blue-500",
              },
              {
                status: "processing",
                label: "Commandes en cours",
                count: processingCount,
                color: "bg-white",
                change:
                  totalOrders > 0
                    ? `${((processingCount / totalOrders) * 100).toFixed(1)}%`
                    : "0%",
                textColor: "text-gray-900",
                iconColor: "bg-orange-500",
              },
              {
                status: "completed",
                label: "Commandes terminées",
                count: completedCount,
                color: "bg-white",
                change:
                  totalOrders > 0
                    ? `${((completedCount / totalOrders) * 100).toFixed(1)}%`
                    : "0%",
                textColor: "text-gray-900",
                iconColor: "bg-green-500",
              },
              {
                status: "total",
                label: "Commandes totales",
                count: totalOrders,
                color: "bg-white",
                change: "100%",
                textColor: "text-gray-900",
                iconColor: "bg-purple-500",
              },
            ];
          })().map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-2xl p-6 shadow-lg relative overflow-hidden border border-gray-200`}
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${item.iconColor} rounded-full flex items-center justify-center`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.change}
                  </span>
                </div>
                <div className="mb-2">
                  <h3 className={`text-3xl font-bold ${item.textColor}`}>
                    {item.count}
                  </h3>
                  <p className={`text-sm ${item.textColor} opacity-70`}>
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-white text-gray-900 placeholder-gray-500 rounded-xl px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-300"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="text-gray-600 text-sm">
              {filteredOrders.length} commandes
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Lavage
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                PayPal
              </span>
              <span className="text-xs text-gray-600">Effacer tout (2)</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                Export
              </button>
              <select className="bg-white text-gray-900 px-3 py-2 rounded-xl border border-gray-300">
                <option>Trier: par défaut</option>
                <option>Date</option>
                <option>Montant</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                + Ajouter commande
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Commandes récentes
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>1 sur 18</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucune commande trouvée.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 bg-white"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      NUMÉRO DE COMMANDE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      CLIENT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      CATÉGORIE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      PRIX
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      PAIEMENT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      STATUT
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 bg-white"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {typeof order.id === "string" &&
                          order.id.includes("#")
                            ? order.id
                            : `#${order.id}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer?.name ||
                              order.customer ||
                              "Client inconnu"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.customer?.email || order.email || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">Lavage</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          €{order.total_amount || order.total || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString(
                                "fr-FR"
                              )
                            : order.date || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">PayPal</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-600 hover:text-gray-900">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
