"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { usersService, User } from "../../../services/adminService";
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

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<(string | number)[]>([]);

  // Charger les utilisateurs
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await usersService.getAll({ page: 1, limit: 50 });
        setUsers(response.products || []);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Chargement des utilisateurs...</div>
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

  // Données simulées des utilisateurs (fallback)
  const fallbackUsers = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78",
      role: "Client",
      status: "Actif",
      joinDate: "2024-12-15",
      ordersCount: 3,
      totalSpent: 156.99,
      lastActivity: "2024-12-20",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@email.com",
      phone: "06 87 65 43 21",
      role: "Client",
      status: "Actif",
      joinDate: "2024-11-20",
      ordersCount: 5,
      totalSpent: 289.5,
      lastActivity: "2024-12-19",
      avatar: "MM",
    },
    {
      id: 3,
      name: "Pierre Durand",
      email: "pierre.durand@email.com",
      phone: "06 11 22 33 44",
      role: "Admin",
      status: "Actif",
      joinDate: "2024-10-10",
      ordersCount: 0,
      totalSpent: 0,
      lastActivity: "2024-12-20",
      avatar: "PD",
    },
    {
      id: 4,
      name: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      phone: "06 55 66 77 88",
      role: "Client",
      status: "Inactif",
      joinDate: "2024-09-05",
      ordersCount: 1,
      totalSpent: 45.99,
      lastActivity: "2024-11-15",
      avatar: "SB",
    },
    {
      id: 5,
      name: "Thomas Leroy",
      email: "thomas.leroy@email.com",
      phone: "06 99 88 77 66",
      role: "Client",
      status: "En attente",
      joinDate: "2024-12-18",
      ordersCount: 0,
      totalSpent: 0,
      lastActivity: "2024-12-18",
      avatar: "TL",
    },
  ];

  const displayUsers = users.length > 0 ? users : fallbackUsers;

  const roles = ["Tous", "admin", "user", "Client", "Admin"];
  const statuses = ["Tous", "Actif", "Inactif", "En attente"];

  // Filtrer les utilisateurs
  const filteredUsers = displayUsers.filter((user) => {
    const matchesSearch =
      (user as any).name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "Tous" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "Tous" || (user as any).status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Actif":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "Inactif":
        return <XCircleIcon className="w-4 h-4 text-red-500" />;
      case "En attente":
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactif":
        return "bg-red-100 text-red-800 border-red-200";
      case "En attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
      case "Admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
      case "Client":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string | number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600">Gérez les comptes utilisateurs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <UserPlusIcon className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
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
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filtre par rôle */}
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtre par statut */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des utilisateurs */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <Checkbox
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Utilisateur
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Commandes
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Total dépensé
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Dernière activité
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) =>
                          handleSelectUser(user.id, checked as boolean)
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {(user as any).avatar ||
                                (user as any).name?.charAt(0) ||
                                user.email.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {(user as any).name || "Utilisateur"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {(user as any).phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={getRoleColor(user.role)}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon((user as any).status || "Actif")}
                        <Badge
                          variant="outline"
                          className={getStatusColor(
                            (user as any).status || "Actif"
                          )}
                        >
                          {(user as any).status || "Actif"}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {(user as any).ordersCount || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        €{((user as any).totalSpent || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {(user as any).lastActivity || "N/A"}
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
                          <EllipsisVerticalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun utilisateur trouvé.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions en lot */}
      {selectedUsers.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedUsers.length} utilisateur
                {selectedUsers.length > 1 ? "s" : ""} sélectionné
                {selectedUsers.length > 1 ? "s" : ""}
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
