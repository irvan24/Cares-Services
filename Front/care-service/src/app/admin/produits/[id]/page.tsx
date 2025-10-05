"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { productsService, Product } from "../../../../services/adminService";
import AdminProtectedRoute from "../../../../components/AdminProtectedRoute";
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
  TrashIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const categories = ["Intérieur", "Extérieur"];

  // Charger le produit au montage du composant
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await productsService.getById(productId);
        setProduct(productData);

        // Pré-remplir le formulaire avec les données du produit
        setFormData({
          name: productData.name || "",
          description: productData.description || "",
          price: productData.price?.toString() || "",
          stock: productData.stock?.toString() || "",
          category: productData.category || "",
          image: productData.image || "",
        });
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image valide.");
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La taille du fichier ne doit pas dépasser 5MB.");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", file);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";
      const response = await fetch(`${API_URL}/admin/products/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload de l'image");
      }

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          image: result.imageUrl,
        }));
      } else {
        throw new Error(result.error || "Erreur lors de l'upload");
      }
    } catch (error) {
      console.error("Erreur upload:", error);
      alert("Erreur lors de l'upload de l'image. Veuillez réessayer.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.name || !formData.description || !formData.price) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setSaving(true);

      const updateData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        category: formData.category,
        image: formData.image,
      };

      await productsService.update(productId, updateData);
      alert("Produit modifié avec succès !");
      router.push("/admin/produits");
    } catch (err) {
      console.error("Erreur lors de la modification:", err);
      alert("Erreur lors de la modification du produit");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
      )
    ) {
      try {
        await productsService.delete(productId);
        alert("Produit supprimé avec succès !");
        router.push("/admin/produits");
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        alert("Erreur lors de la suppression du produit");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du produit...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Erreur</p>
          <p>{error}</p>
        </div>
        <Link
          href="/admin/produits"
          className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/produits"
                className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Retour aux produits</span>
              </Link>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                Supprimer
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Modifier le produit
          </h1>
          <p className="text-gray-600 mt-2">
            Modifiez les informations de ce produit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informations de base
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom du produit */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  placeholder="Nom du produit"
                  required
                />
              </div>

              {/* Description courte */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description courte *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  placeholder="Description courte du produit"
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  placeholder="0"
                  required
                />
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Image du produit
            </h2>

            <div className="space-y-6">
              {/* Zone de drag & drop */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadingImage}
                />

                {uploadingImage ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mb-4"></div>
                    <p className="text-gray-600">Upload en cours...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Glissez-déposez une image ici
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      ou cliquez pour sélectionner un fichier
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, JPEG jusqu'à 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* URL manuelle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ou saisissez une URL d'image
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Aperçu de l'image */}
              {formData.image && (
                <div className="relative">
                  <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden mx-auto">
                    <Image
                      src={formData.image}
                      alt="Aperçu du produit"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Bouton supprimer l'image */}
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    title="Supprimer l'image"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/produits"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
            </button>
          </div>
        </form>
      </div>
    </AdminProtectedRoute>
  );
}
