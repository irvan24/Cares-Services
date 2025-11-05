"use client";
import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Booking {
  id: string | number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: string;
  serviceType: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export default function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [selectedVehicleType, setSelectedVehicleType] = useState("Tous");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookings, setSelectedBookings] = useState<(string | number)[]>(
    []
  );

  // Charger les bookings
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par l'appel API réel
        // const response = await bookingsService.getAll();
        // setBookings(response.bookings || []);

        // Données simulées pour le développement
        const mockBookings: Booking[] = [
          {
            id: 1,
            customerName: "Jean Dupont",
            customerEmail: "jean.dupont@email.com",
            customerPhone: "06 12 34 56 78",
            vehicleType: "Citadine",
            serviceType: "Révision complète",
            date: "2024-12-25",
            time: "09:00",
            status: "confirmed",
            totalPrice: 89.99,
            notes: "Première révision",
            createdAt: "2024-12-20",
          },
          {
            id: 2,
            customerName: "Marie Martin",
            customerEmail: "marie.martin@email.com",
            customerPhone: "06 87 65 43 21",
            vehicleType: "Berline",
            serviceType: "Changement pneus",
            date: "2024-12-26",
            time: "14:30",
            status: "pending",
            totalPrice: 45.5,
            notes: "Pneus hiver",
            createdAt: "2024-12-21",
          },
          {
            id: 3,
            customerName: "Pierre Durand",
            customerEmail: "pierre.durand@email.com",
            customerPhone: "06 11 22 33 44",
            vehicleType: "SUV",
            serviceType: "Contrôle technique",
            date: "2024-12-27",
            time: "10:15",
            status: "completed",
            totalPrice: 75.0,
            notes: "Contrôle réussi",
            createdAt: "2024-12-18",
          },
          {
            id: 4,
            customerName: "Sophie Bernard",
            customerEmail: "sophie.bernard@email.com",
            customerPhone: "06 55 66 77 88",
            vehicleType: "Citadine",
            serviceType: "Réparation freins",
            date: "2024-12-28",
            time: "16:00",
            status: "cancelled",
            totalPrice: 120.0,
            notes: "Annulé par le client",
            createdAt: "2024-12-19",
          },
          {
            id: 5,
            customerName: "Thomas Leroy",
            customerEmail: "thomas.leroy@email.com",
            customerPhone: "06 99 88 77 66",
            vehicleType: "Berline",
            serviceType: "Vidange",
            date: "2024-12-29",
            time: "11:30",
            status: "confirmed",
            totalPrice: 35.0,
            notes: "Vidange standard",
            createdAt: "2024-12-22",
          },
        ];

        setBookings(mockBookings);
      } catch (err) {
        setError("Erreur lors du chargement des réservations");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Chargement des réservations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statuses = ["Tous", "pending", "confirmed", "completed", "cancelled"];
  const vehicleTypes = ["Tous", "Citadine", "Berline", "SUV"];

  // Filtrer les bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "Tous" || booking.status === selectedStatus;
    const matchesVehicleType =
      selectedVehicleType === "Tous" ||
      booking.vehicleType === selectedVehicleType;
    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <ClockIcon className="w-4 h-4 text-green-500" />;
      case "pending":
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <ClockIcon className="w-4 h-4 text-blue-500" />;
      case "cancelled":
        return <ClockIcon className="w-4 h-4 text-red-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmé";
      case "pending":
        return "En attente";
      case "completed":
        return "Terminé";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const getVehicleTypeColor = (vehicleType: string) => {
    switch (vehicleType) {
      case "Citadine":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Berline":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "SUV":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(filteredBookings.map((booking) => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (
    bookingId: string | number,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId]);
    } else {
      setSelectedBookings(selectedBookings.filter((id) => id !== bookingId));
    }
  };

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Réservations</h1>
          <p className="text-gray-600">Gérez les réservations de services</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une réservation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filtre par statut */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "Tous"
                      ? "Tous les statuts"
                      : getStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtre par type de véhicule */}
            <Select
              value={selectedVehicleType}
              onValueChange={setSelectedVehicleType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par véhicule" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "Tous" ? "Tous les véhicules" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des réservations */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <Checkbox
                      checked={
                        selectedBookings.length === filteredBookings.length &&
                        filteredBookings.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Véhicule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Date & Heure
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Prix
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) =>
                          handleSelectBooking(booking.id, checked as boolean)
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customerEmail}
                          </div>
                          <div className="text-xs text-gray-400">
                            {booking.customerPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <TruckIcon className="w-4 h-4 text-gray-500" />
                        <Badge
                          variant="outline"
                          className={getVehicleTypeColor(booking.vehicleType)}
                        >
                          {booking.vehicleType}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.serviceType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(booking.status)}
                        >
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        €{booking.totalPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune réservation trouvée.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions en lot */}
      {selectedBookings.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedBookings.length} réservation
                {selectedBookings.length > 1 ? "s" : ""} sélectionnée
                {selectedBookings.length > 1 ? "s" : ""}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  Modifier en lot
                </Button>
                <Button variant="destructive" size="sm">
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
