"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dashboardService, DashboardStats } from "../../services/adminService";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("3months");

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
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Données réelles du backend pour le graphique de tendance
  const visitorData = stats?.revenueChart?.map((item) => ({
    date: item.label,
    visitors: Math.round(item.revenue / 10), // Conversion approximative revenus -> visiteurs
  })) || [{ date: "Aucune donnée", visitors: 0 }];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: `€${Math.round((stats?.stats.revenue || 0) * 0.6)}`,
      change: stats?.stats.variations?.revenue || 0,
      changeText: "Trending up this month",
      subtitle: "Revenue for the last 6 months",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "New Customers",
      value: stats?.stats.users || 0,
      change: stats?.stats.variations?.users || 0,
      changeText: "Down 20% this period",
      subtitle: "Acquisition needs attention",
      icon: Users,
      trend: "down",
    },
    {
      title: "Commandes Traitées",
      value: stats?.stats.orders || 0,
      change: stats?.stats.variations?.orders || 0,
      changeText: "Commandes ce mois",
      subtitle: "Performance des ventes",
      icon: Activity,
      trend: "up",
    },
    {
      title: "Nouveaux Bookings",
      value: stats?.stats.orders || 0,
      change: stats?.stats.variations?.orders || 0,
      changeText: "Réservations ce mois",
      subtitle: "Demande de services",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="px-6 py-4 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((kpi, index) => (
              <Card
                key={index}
                className={`border border-gray-200 shadow-sm ${
                  kpi.title === "New Customers" ||
                  kpi.title === "Commandes Traitées" ||
                  kpi.title === "Nouveaux Bookings"
                    ? "cursor-pointer hover:shadow-md transition-shadow"
                    : ""
                }`}
                onClick={
                  kpi.title === "New Customers"
                    ? () => router.push("/admin/utilisateurs")
                    : kpi.title === "Commandes Traitées"
                    ? () => router.push("/admin/commandes")
                    : kpi.title === "Nouveaux Bookings"
                    ? () => router.push("/admin/bookings")
                    : undefined
                }
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-600">
                          {kpi.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? "..." : kpi.value}
                        </p>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <kpi.icon className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {kpi.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            kpi.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {kpi.change >= 0 ? "+" : ""}
                          {kpi.change}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{kpi.changeText}</p>
                      <p className="text-xs text-gray-500">{kpi.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Section */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Évolution des Revenus
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Tendances des revenus sur les derniers mois
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={timeRange === "3months" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("3months")}
                    className={
                      timeRange === "3months"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    3 derniers mois
                  </Button>
                  <Button
                    variant={timeRange === "30days" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("30days")}
                    className={
                      timeRange === "30days"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    30 derniers jours
                  </Button>
                  <Button
                    variant={timeRange === "7days" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("7days")}
                    className={
                      timeRange === "7days"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    7 derniers jours
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <defs>
                      <linearGradient
                        id="colorVisitors"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis
                      dataKey="date"
                      className="text-xs text-gray-500"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      className="text-xs text-gray-500"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{ color: "#374151", fontSize: "14px" }}
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Revenus",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#colorVisitors)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance
                </CardTitle>
                <CardDescription>
                  Indicateurs clés de performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Commandes Traitées
                      </p>
                      <p className="text-sm text-gray-600">Ce mois</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {loading ? "..." : stats?.stats.orders || 0}
                      </p>
                      <p
                        className={`text-sm ${
                          (stats?.stats.variations?.orders || 0) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {(stats?.stats.variations?.orders || 0) >= 0 ? "+" : ""}
                        {stats?.stats.variations?.orders || 0}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Nouveaux Clients
                      </p>
                      <p className="text-sm text-gray-600">Ce mois</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {loading ? "..." : stats?.stats.users || 0}
                      </p>
                      <p
                        className={`text-sm ${
                          (stats?.stats.variations?.users || 0) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {(stats?.stats.variations?.users || 0) >= 0 ? "+" : ""}
                        {stats?.stats.variations?.users || 0}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Vue d'ensemble
                </CardTitle>
                <CardDescription>
                  Statistiques principales de l'activité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Produits Actifs
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {loading ? "..." : stats?.stats.products || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Commandes En Cours
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {loading
                        ? "..."
                        : (stats?.ordersByStatus?.processing || 0) +
                          (stats?.ordersByStatus?.pending || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Revenus Ce Mois
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {loading
                        ? "..."
                        : `€${Math.round((stats?.stats.revenue || 0) * 0.6)}`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
