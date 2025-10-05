"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Produits", href: "/admin/produits", icon: ShoppingBagIcon },
    {
      name: "Commandes",
      href: "/admin/commandes",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Utilisateurs", href: "/admin/utilisateurs", icon: UserGroupIcon },
    { name: "Paramètres", href: "/admin/parametres", icon: Cog6ToothIcon },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/care.png"
              alt="CARE Services"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold text-lg">Admin</span>
          </div>

          {/* User info and logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              title="Déconnexion"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col"
        style={{ top: "56px" }}
      >
        <div className="flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto border-r border-gray-700">
          {/* Navigation */}
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white border-l-4 border-cyan-400"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/care.png"
            alt="CARE Services"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-bold">Admin</span>
        </div>
        <div className="flex items-center space-x-3">
          {/* User info mobile */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              title="Déconnexion"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-800">
          <div className="pt-16 pb-4 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
