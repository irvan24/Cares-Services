"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dashboardService, DashboardStats } from "../../services/adminService";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques");
        console.error("Erreur dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gray-800 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 sm:px-4 py-2 pl-8 sm:pl-10 w-full sm:w-32 md:w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                />
                <svg
                  className="absolute left-2 sm:left-3 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
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
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
              <div className="text-white text-xs sm:text-sm hidden lg:block">
                Aujourd'hui,{" "}
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-300"
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
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-700 rounded-full flex items-center justify-center hidden sm:flex">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-300"
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
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    IA
                  </span>
                </div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded hidden sm:block"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-6 bg-gray-100">
          {/* Welcome Section */}

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            {/* 1. Nombre de produits */}
            <Link
              href="/admin/produits"
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Nombre de produits
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {loading ? "..." : stats?.stats.products || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                    (stats?.stats.variations?.products || 0) >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {(stats?.stats.variations?.products || 0) >= 0 ? "+" : ""}
                  {stats?.stats.variations?.products || 0}%
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Ce mois vs dernier
                </span>
              </div>
            </Link>

            {/* 2. Nombre de comptes créés */}
            <Link
              href="/admin/utilisateurs"
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Nombre de comptes créés
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {loading ? "..." : stats?.stats.users || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                    (stats?.stats.variations?.users || 0) >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {(stats?.stats.variations?.users || 0) >= 0 ? "+" : ""}
                  {stats?.stats.variations?.users || 0}%
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Ce mois vs dernier
                </span>
              </div>
            </Link>

            {/* 3. Nombre de commandes totales */}
            <Link
              href="/admin/commandes"
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Nombre de commandes totales
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {loading ? "..." : stats?.stats.orders || 0}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                    (stats?.stats.variations?.orders || 0) >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {(stats?.stats.variations?.orders || 0) >= 0 ? "+" : ""}
                  {stats?.stats.variations?.orders || 0}%
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Ce mois vs dernier
                </span>
              </div>
            </Link>

            {/* 4. Bénéfice net */}
            <Link
              href="/admin/statistiques"
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    Bénéfice net
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {loading
                      ? "..."
                      : `€${Math.round((stats?.stats.revenue || 0) * 0.6)}`}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium ${
                    (stats?.stats.variations?.revenue || 0) >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {(stats?.stats.variations?.revenue || 0) >= 0 ? "+" : ""}
                  {stats?.stats.variations?.revenue || 0}%
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  Ce mois vs dernier
                </span>
              </div>
            </Link>
          </div>

          {/* Section Graphiques et Commandes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            {/* Graphique des revenus */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Revenues
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="bg-white text-gray-900 text-xs sm:text-sm rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 border border-gray-300 w-full sm:w-auto">
                    <option>Ce mois</option>
                    <option>Ce trimestre</option>
                    <option>Cette année</option>
                  </select>
                </div>
              </div>

              {/* Graphique en courbe */}
              <div className="h-48 sm:h-56 lg:h-64 relative">
                {stats?.revenueChart && stats.revenueChart.length > 0 ? (
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 200"
                    preserveAspectRatio="none"
                  >
                    {/* Grille horizontale */}
                    <defs>
                      <pattern
                        id="grid"
                        width="80"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 80 0 L 0 0 0 40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Courbe des revenus */}
                    <path
                      d={(() => {
                        const maxRevenue = Math.max(
                          ...stats.revenueChart.map((d) => d.revenue)
                        );
                        const minRevenue = Math.min(
                          ...stats.revenueChart.map((d) => d.revenue)
                        );
                        const range = maxRevenue - minRevenue || 1;

                        const points = stats.revenueChart
                          .map((data, index) => {
                            const x =
                              (index / (stats.revenueChart.length - 1)) * 800;
                            const y =
                              180 - ((data.revenue - minRevenue) / range) * 160;
                            return `${x},${y}`;
                          })
                          .join(" ");

                        return `M ${points.split(" ").join(" L ")}`;
                      })()}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      className="drop-shadow-lg"
                    />

                    {/* Points de données */}
                    {stats.revenueChart.map((data, index) => {
                      const maxRevenue = Math.max(
                        ...stats.revenueChart.map((d) => d.revenue)
                      );
                      const minRevenue = Math.min(
                        ...stats.revenueChart.map((d) => d.revenue)
                      );
                      const range = maxRevenue - minRevenue || 1;
                      const x = (index / (stats.revenueChart.length - 1)) * 800;
                      const y =
                        180 - ((data.revenue - minRevenue) / range) * 160;

                      return (
                        <g key={index}>
                          {/* Ligne pointillée verticale */}
                          <line
                            x1={x}
                            y1={y}
                            x2={x}
                            y2={20}
                            stroke="#10b981"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            opacity="0.3"
                          />
                          {/* Point de données */}
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#10b981"
                            className="hover:r-6 transition-all duration-200 cursor-pointer"
                          />
                          {/* Label avec valeur */}
                          <g
                            transform={`translate(${x}, ${Math.max(
                              y - 30,
                              10
                            )})`}
                          >
                            <rect
                              x="-30"
                              y="-20"
                              width="60"
                              height="16"
                              rx="8"
                              fill="#f3f4f6"
                              opacity="0.95"
                              stroke="#e5e7eb"
                              strokeWidth="1"
                            />
                            <text
                              x="0"
                              y="-5"
                              textAnchor="middle"
                              className="text-xs fill-gray-900 font-medium"
                            >
                              €{data.revenue.toFixed(2)}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-400 text-sm">
                      Aucune donnée disponible
                    </div>
                  </div>
                )}

                {/* Labels des axes */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                  {stats?.revenueChart?.map((data, index) => (
                    <span key={index} className="text-center">
                      {data.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Graphique en donut */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Ventes par catégorie
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Ce mois vs dernier
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      strokeDasharray="25 75"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="8"
                      strokeDasharray="25 75"
                      strokeDashoffset="-25"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="8"
                      strokeDasharray="17 83"
                      strokeDashoffset="-50"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="8"
                      strokeDasharray="19 81"
                      strokeDashoffset="-67"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#84cc16"
                      strokeWidth="8"
                      strokeDasharray="14 86"
                      strokeDashoffset="-86"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                {[
                  {
                    color: "bg-cyan-500",
                    label: "Lavage Extérieur",
                    value: "25%",
                  },
                  {
                    color: "bg-yellow-500",
                    label: "Nettoyage Intérieur",
                    value: "25%",
                  },
                  {
                    color: "bg-green-500",
                    label: "Detailing Complet",
                    value: "17%",
                  },
                  {
                    color: "bg-orange-500",
                    label: "Service Premium",
                    value: "19%",
                  },
                  { color: "bg-lime-500", label: "Entretien", value: "14%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${item.color} mr-1 sm:mr-2 flex-shrink-0`}
                      ></div>
                      <span className="text-gray-700 truncate">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-gray-900 font-medium flex-shrink-0 ml-2">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Commandes et Clients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {loading
                      ? "..."
                      : (stats?.ordersByStatus?.pending || 0) +
                        (stats?.ordersByStatus?.processing || 0)}
                  </h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                  commandes à traiter
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {stats?.ordersByStatus?.pending || 0} en attente,{" "}
                  {stats?.ordersByStatus?.processing || 0} en cours.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {loading ? "..." : stats?.stats.users || 0}
                  </h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                  clients
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {loading ? "..." : stats?.stats.users || 0} clients en attente
                  de réponse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
