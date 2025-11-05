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
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import ProductDetailPreview from "../../../components/ProductDetailPreview";
import AdminProtectedRoute from "../../../components/AdminProtectedRoute";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>(
    []
  );

  // Charger les produits et catégories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, categoriesResponse] = await Promise.all([
          productsService.getAll({ page: 1, limit: 50 }),
          categoriesService.getAll(),
        ]);

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

  // Ouvrir le modal de confirmation de suppression
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await productsService.delete(productToDelete.id);
      setProductsList(productsList.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Ouvrir le preview d'un produit
  const handleProductPreview = (product: Product) => {
    setSelectedProduct(product);
    setShowPreview(true);
  };

  // Fermer le preview
  const closePreview = () => {
    setShowPreview(false);
    setSelectedProduct(null);
  };

  // Fonction pour recharger les données
  const reloadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsService.getAll({ page: 1, limit: 50 }),
        categoriesService.getAll(),
      ]);

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (
    productId: string | number,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="px-6 py-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Produits</h1>
            <p className="text-gray-600">Gérez votre catalogue de produits</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/admin/produits/nouveau">
              <PlusIcon className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Link>
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
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filtre par catégorie */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Actions en lot */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Exporter
                </Button>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par défaut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Par défaut</SelectItem>
                    <SelectItem value="name">Nom</SelectItem>
                    <SelectItem value="price">Prix</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des produits */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <Checkbox
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Produit
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Catégorie
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Prix
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) =>
                            handleSelectProduct(product.id, checked as boolean)
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
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
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-200"
                        >
                          {product.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          €{product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {product.stock} unités
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={
                            product.is_active
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {product.is_active ? "Actif" : "Inactif"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/produits/${product.id}`}>
                                <PencilIcon className="w-4 h-4 mr-2" />
                                Modifier
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleProductPreview(product)}
                            >
                              <EyeIcon className="w-4 h-4 mr-2" />
                              Prévisualiser
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(product)}
                              className="text-red-600"
                            >
                              <TrashIcon className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-900">Chargement des produits...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <ExclamationTriangleIcon className="w-16 h-16 text-red-400" />
                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-2">
                      Erreur de chargement
                    </h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={() => window.location.reload()}>
                      Actualiser la page
                    </Button>
                    <Button variant="outline" onClick={reloadData}>
                      Réessayer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
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
                    <Button asChild>
                      <Link href="/admin/produits/nouveau">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Ajouter un produit
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions en lot */}
        {selectedProducts.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedProducts.length} produit
                  {selectedProducts.length > 1 ? "s" : ""} sélectionné
                  {selectedProducts.length > 1 ? "s" : ""}
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

        {/* Modal Preview */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Aperçu du produit</DialogTitle>
              <DialogDescription>
                Détails complets du produit sélectionné
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <ProductDetailPreview
                product={selectedProduct}
                onDelete={(product) => {
                  setShowPreview(false);
                  handleDeleteClick(product);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de confirmation de suppression */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-600" />
                Supprimer le produit
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer le produit{" "}
                <strong>"{productToDelete?.name}"</strong> ? Cette action est
                irréversible et supprimera définitivement le produit de votre
                catalogue.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Suppression..." : "Supprimer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminProtectedRoute>
  );
}
