"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  FolderIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-gray-900">
        <div className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center px-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
              </div>
              <span className="text-white font-semibold text-lg">
                Cares Services
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              {/* Home Section */}
              <div className="mb-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Home
                </p>
                <div className="space-y-1">
                  <Link
                    href="/admin"
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/admin")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <HomeIcon className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/analytics"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ChartBarIcon className="mr-3 h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    href="/admin/projects"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FolderIcon className="mr-3 h-5 w-5" />
                    Projects
                  </Link>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mb-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Documents
                </p>
                <div className="space-y-1">
                  <Link
                    href="/admin/produits"
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/admin/produits")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <ShoppingBagIcon className="mr-3 h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    href="/admin/commandes"
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/admin/commandes")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <ClipboardDocumentListIcon className="mr-3 h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="/admin/utilisateurs"
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/admin/utilisateurs")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <UserGroupIcon className="mr-3 h-5 w-5" />
                    Users
                  </Link>
                </div>
              </div>

              {/* More Section */}
              <div className="mt-auto">
                <Link
                  href="/admin/parametres"
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive("/admin/parametres")
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <EllipsisHorizontalIcon className="mr-3 h-5 w-5" />
                  More
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 lg:ml-64">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>

          {/* User info and logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm">
                    {user?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
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

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-gray-900 font-semibold">Cares Services</span>
        </div>
        <div className="flex items-center space-x-3">
          {/* User info mobile */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-700 font-bold text-xs">
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
            className="text-gray-600 hover:text-gray-900"
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
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-900">
          <div className="pt-16 pb-4 overflow-y-auto">
            <nav className="px-4 space-y-2">
              {/* Home Section */}
              <div className="mb-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Home
                </p>
                <div className="space-y-1">
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                      isActive("/admin")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <HomeIcon className="mr-4 h-6 w-6" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/analytics"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ChartBarIcon className="mr-4 h-6 w-6" />
                    Analytics
                  </Link>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mb-6">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Documents
                </p>
                <div className="space-y-1">
                  <Link
                    href="/admin/produits"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                      isActive("/admin/produits")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <ShoppingBagIcon className="mr-4 h-6 w-6" />
                    Products
                  </Link>
                  <Link
                    href="/admin/commandes"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                      isActive("/admin/commandes")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <ClipboardDocumentListIcon className="mr-4 h-6 w-6" />
                    Orders
                  </Link>
                  <Link
                    href="/admin/utilisateurs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                      isActive("/admin/utilisateurs")
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <UserGroupIcon className="mr-4 h-6 w-6" />
                    Users
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
