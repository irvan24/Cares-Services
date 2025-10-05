"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  productsService,
  categoriesService,
  Product,
  Category,
} from "../../../services/adminService";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import ProductDetailPreview from "../../../components/ProductDetailPreview";
import AdminProtectedRoute from "../../../components/AdminProtectedRoute";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalClosing, setIsDeleteModalClosing] = useState(false);
  const [isDeleteModalOpening, setIsDeleteModalOpening] = useState(false);

  // Charger les produits et catégories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null); // Réinitialiser l'erreur

        const [productsResponse, categoriesResponse] = await Promise.all([
          productsService.getAll({ page: 1, limit: 50 }),
          categoriesService.getAll(),
        ]);

        // Le backend retourne { data: { products: [...], pagination: {...} } }
        setProductsList(productsResponse.products || []);
        setCategories(categoriesResponse || []);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError(
          "Impossible de charger les produits. Vérifiez votre connexion."
        );
        setProductsList([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les produits
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tous" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ouvrir le modal de confirmation de suppression avec animation
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setIsDeleteModalOpening(true);
    setOpenMenuId(null); // Fermer le menu déroulant

    // Reset l'état d'ouverture après l'animation
    setTimeout(() => {
      setIsDeleteModalOpening(false);
    }, 300); // Durée de l'animation d'entrée
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await productsService.delete(productToDelete.id);
      setProductsList(productsList.filter((p) => p.id !== productToDelete.id));

      // Fermer le modal avec animation
      setIsDeleteModalClosing(true);
      setTimeout(() => {
        setShowDeleteModal(false);
        setProductToDelete(null);
        setIsDeleteModalClosing(false);
        setIsDeleteModalOpening(false);
      }, 200);

      // Produit supprimé avec succès - pas de popup
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      // Pas de popup d'erreur non plus
    } finally {
      setIsDeleting(false);
    }
  };

  // Annuler la suppression avec animation
  const cancelDelete = () => {
    setIsDeleteModalClosing(true);
    setTimeout(() => {
      setShowDeleteModal(false);
      setProductToDelete(null);
      setIsDeleteModalClosing(false);
      setIsDeleteModalOpening(false);
    }, 200); // Durée de l'animation de sortie
  };

  // Ouvrir le preview d'un produit avec animation
  const handleProductPreview = (product: Product) => {
    setSelectedProduct(product);
    setShowPreview(true);
    setIsOpening(true);
    // Reset l'état d'ouverture après l'animation
    setTimeout(() => {
      setIsOpening(false);
    }, 300); // Durée de l'animation d'entrée
  };

  // Fermer le preview avec animation
  const closePreview = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPreview(false);
      setSelectedProduct(null);
      setIsClosing(false);
      setIsOpening(false); // Reset aussi l'état d'ouverture
    }, 200); // Durée de l'animation de sortie
  };

  // Fermer le modal avec la touche Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreview();
      }
    };

    if (showPreview) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showPreview]);

  // Fermer le menu déroulant en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId) {
        setIsMenuClosing(true);
        setTimeout(() => {
          setOpenMenuId(null);
          setIsMenuClosing(false);
          setMenuPosition(null);
        }, 75);
      }
    };

    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  // Fonction pour recharger les données
  const reloadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsService.getAll({ page: 1, limit: 50 }),
        categoriesService.getAll(),
      ]);

      // Le backend retourne { data: { products: [...], pagination: {...} } }
      setProductsList(productsResponse.products || []);
      setCategories(categoriesResponse || []);
    } catch (err) {
      console.error("Erreur lors du rechargement:", err);
      setError("Impossible de charger les produits. Vérifiez votre connexion.");
      setProductsList([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtenir les catégories uniques
  const categoryOptions = ["Tous", ...categories.map((c) => c.name)];

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-100 overflow-visible">
        <div className="pt-14 lg:pl-64">
          {/* Header */}
          

          <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 overflow-visible">
            {/* Header */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Gestion des produits
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Gérez votre catalogue de produits
                  </p>
                </div>
                <Link
                  href="/admin/produits/nouveau"
                  className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg sm:rounded-xl font-semibold transition-colors text-xs sm:text-sm lg:text-base"
                >
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Ajouter un produit</span>
                  <span className="sm:hidden">Ajouter</span>
                </Link>
              </div>
            </div>

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white text-gray-900 placeholder-gray-500 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 pl-8 sm:pl-10 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-300 text-sm sm:text-base"
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
                <div className="text-gray-600 text-xs sm:text-sm">
                  {filteredProducts.length} produits
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white text-gray-900 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button className="bg-gray-100 text-gray-900 px-2 sm:px-3 lg:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                    Export
                  </button>
                  <select className="bg-white text-gray-900 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl border border-gray-300 text-xs sm:text-sm">
                    <option>Trier: par défaut</option>
                    <option>Nom</option>
                    <option>Prix</option>
                    <option>Stock</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liste des produits */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Produits
                  </h2>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                    <span>1 sur 5</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
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
                        className="w-3 h-3 sm:w-4 sm:h-4"
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

              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-900">Chargement des produits...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <svg
                      className="w-16 h-16 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-medium text-red-600 mb-2">
                        Erreur de chargement
                      </h3>
                      <p className="text-gray-600 mb-4">{error}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
                      >
                        Actualiser la page
                      </button>
                      <button
                        onClick={reloadData}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Réessayer
                      </button>
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Aucun produit
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm || selectedCategory !== "Tous"
                          ? "Aucun produit ne correspond à vos critères de recherche."
                          : "Commencez par ajouter votre premier produit."}
                      </p>
                    </div>
                    {!searchTerm && selectedCategory === "Tous" && (
                      <Link
                        href="/admin/produits/nouveau"
                        className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Ajouter un produit
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto overflow-y-visible">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 bg-white"
                          />
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          PRODUIT
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                          CATÉGORIE
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                          PRIX
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                          STOCK
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                          STATUT
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 relative">
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleProductPreview(product)}
                        >
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                                <div className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <span className="text-xs text-gray-600">
                                        IMG
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 truncate max-w-xs">
                                  {product.description}
                                </div>
                                {/* Affichage mobile des infos supplémentaires */}
                                <div className="sm:hidden mt-1 space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">
                                      {product.category}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-900">
                                      €{product.price}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-600">
                                      {product.stock} unités
                                    </span>
                                    <span
                                      className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                                        product.is_active
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {product.is_active ? "Actif" : "Inactif"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm font-semibold text-gray-900">
                              €{product.price}
                            </div>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                            <div className="text-sm text-gray-600">
                              {product.stock} unités
                            </div>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                product.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.is_active ? "Actif" : "Inactif"}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="relative inline-block">
                              <button
                                ref={(el) => {
                                  if (
                                    el &&
                                    openMenuId === product.id &&
                                    !menuPosition
                                  ) {
                                    const rect = el.getBoundingClientRect();
                                    setMenuPosition({
                                      x: rect.right - 224, // 224px = 56 * 4 (w-56)
                                      y: rect.bottom + 8,
                                    });
                                  }
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (openMenuId === product.id) {
                                    // Fermer avec animation
                                    setIsMenuClosing(true);
                                    setTimeout(() => {
                                      setOpenMenuId(null);
                                      setIsMenuClosing(false);
                                      setMenuPosition(null);
                                    }, 75);
                                  } else {
                                    // Ouvrir
                                    setOpenMenuId(product.id);
                                    setMenuPosition(null); // Reset pour recalculer
                                  }
                                }}
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              >
                                Actions
                                <svg
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Modal Preview - Tailwind UI Pattern */}
          {showPreview && selectedProduct && (
            <div
              className="relative z-50"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              {/* Background backdrop with animation */}
              <div
                className={`fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out ${
                  isClosing
                    ? "opacity-0"
                    : isOpening
                    ? "opacity-0"
                    : "opacity-100"
                }`}
                onClick={closePreview}
              ></div>

              {/* Modal container */}
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                  {/* Modal panel */}
                  <div
                    className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-6xl ${
                      isClosing
                        ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                        : isOpening
                        ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                        : "translate-y-0 opacity-100 sm:scale-100"
                    }`}
                  >
                    {/* Header */}
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-lg font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Aperçu du produit
                        </h3>
                        <button
                          onClick={closePreview}
                          className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                          <span className="sr-only">Fermer</span>
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="mt-4 max-h-[70vh] overflow-y-auto">
                        <ProductDetailPreview
                          product={selectedProduct}
                          onDelete={(product) => {
                            closePreview();
                            handleDeleteClick(product);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal de confirmation de suppression */}
          {showDeleteModal && productToDelete && (
            <div
              className="relative z-40"
              aria-labelledby="delete-modal-title"
              role="dialog"
              aria-modal="true"
            >
              {/* Background backdrop with animation */}
              <div
                className={`fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out ${
                  isDeleteModalClosing
                    ? "opacity-0"
                    : isDeleteModalOpening
                    ? "opacity-0"
                    : "opacity-100"
                }`}
                onClick={cancelDelete}
              ></div>

              {/* Modal container */}
              <div className="fixed inset-0 z-40 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                  {/* Modal panel */}
                  <div
                    className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg ${
                      isDeleteModalClosing
                        ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                        : isDeleteModalOpening
                        ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                        : "translate-y-0 opacity-100 sm:scale-100"
                    }`}
                  >
                    {/* Header */}
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="delete-modal-title"
                          >
                            Supprimer le produit
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Êtes-vous sûr de vouloir supprimer le produit{" "}
                              <strong>"{productToDelete.name}"</strong> ? Cette
                              action est irréversible et supprimera
                              définitivement le produit de votre catalogue.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={confirmDelete}
                        disabled={isDeleting}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
                      >
                        {isDeleting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Suppression...
                          </>
                        ) : (
                          "Supprimer"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={cancelDelete}
                        disabled={isDeleting}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:w-auto"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu déroulant en portal pour éviter les problèmes d'overflow */}
          {openMenuId && menuPosition && (
            <div
              className="fixed z-[9999]"
              style={{
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`,
              }}
            >
              <div
                className={`w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-100 ease-out ${
                  isMenuClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <div className="py-1">
                  <Link
                    href={`/admin/produits/${openMenuId}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuClosing(true);
                      setTimeout(() => {
                        setOpenMenuId(null);
                        setIsMenuClosing(false);
                        setMenuPosition(null);
                      }, 75);
                    }}
                  >
                    <PencilIcon className="w-4 h-4 mr-3" />
                    Modifier
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuClosing(true);
                      setTimeout(() => {
                        setOpenMenuId(null);
                        setIsMenuClosing(false);
                        setMenuPosition(null);
                        const product = productsList.find(
                          (p) => p.id === openMenuId
                        );
                        if (product) handleProductPreview(product);
                      }, 75);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-cyan-700 hover:bg-cyan-50 focus:bg-cyan-50 focus:outline-none transition-colors"
                  >
                    <EyeIcon className="w-4 h-4 mr-3" />
                    Prévisualiser
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuClosing(true);
                      setTimeout(() => {
                        setOpenMenuId(null);
                        setIsMenuClosing(false);
                        setMenuPosition(null);
                        const product = productsList.find(
                          (p) => p.id === openMenuId
                        );
                        if (product) handleDeleteClick(product);
                      }, 75);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors"
                  >
                    <TrashIcon className="w-4 h-4 mr-3" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
