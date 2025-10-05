"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  productsService,
  categoriesService,
  Category,
} from "../../../../services/adminService";
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ProductPreview from "../../../../components/ProductPreview";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  badge: string;
  stock: string;
  image: File | null;
}

export default function ProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    badge: "",
    stock: "",
    image: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Charger les catégories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoriesService.getAll();
        setCategories(response || []);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Gestion du drag & drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
  };

  // Fonction pour fermer le modal avec animation
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPreview(false);
      setIsClosing(false);
    }, 300);
  };

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPreview && !isClosing) {
        closeModal();
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
  }, [showPreview, isClosing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.stock
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setLoading(true);

      // Trouver l'ID de la catégorie sélectionnée ou utiliser une valeur par défaut
      const selectedCategory = categories.find(
        (cat) => cat.name === formData.category
      );

      // Pour les catégories Intérieur/Extérieur, utiliser des IDs spécifiques
      let categoryId = "1"; // Valeur par défaut
      if (formData.category === "Intérieur") {
        categoryId = "1";
      } else if (formData.category === "Extérieur") {
        categoryId = "2";
      } else if (selectedCategory) {
        categoryId = selectedCategory.id;
      }

      // Créer FormData pour l'upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category_id", categoryId);
      formDataToSend.append("is_active", "true");

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      // Utiliser le service adminService pour créer le produit
      const token = localStorage.getItem("admin-token");

      const response = await fetch("http://localhost:3004/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Produit créé avec succès !");
        // Attendre un peu avant la redirection pour éviter les conflits
        setTimeout(() => {
          router.push("/admin/produits");
        }, 100);
      } else {
        console.error("Erreur création produit:", result);
        alert(
          `Erreur lors de la création du produit: ${
            result.error || result.details || "Erreur inconnue"
          }`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      alert(
        `Erreur lors de la création du produit: ${
          (error as Error).message || "Erreur inconnue"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/admin/produits"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Retour aux produits</span>
            </Link>
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

      <div className="p-4 sm:p-6 bg-gray-100">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Nouveau produit
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>

        {/* Bouton de prévisualisation */}
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            Aperçu du produit
          </button>
        </div>

        {/* Modal de prévisualisation */}
        {showPreview && (
          <div
            className={`fixed inset-0 bg-gray-900 bg-opacity-5 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out ${
              isClosing ? "animate-out fade-out" : "animate-in fade-in"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget && !isClosing) {
                closeModal();
              }
            }}
          >
            <div
              className={`bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-300 ease-in-out ${
                isClosing ? "animate-out zoom-out-95" : "animate-in zoom-in-95"
              }`}
            >
              {/* Header du modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Aperçu du produit
                </h2>
                <button
                  onClick={closeModal}
                  disabled={isClosing}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Fermer l'aperçu"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Contenu du modal */}
              <div className="p-6">
                <ProductPreview formData={formData} />
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informations de base
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Nom du produit */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  placeholder="Description courte du produit"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Intérieur">Intérieur</option>
                  <option value="Extérieur">Extérieur</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantité */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantité en stock *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  placeholder="100"
                  required
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Badge (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => handleInputChange("badge", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  placeholder="Populaire, Premium, etc."
                />
              </div>
            </div>
          </div>

          {/* Upload d'image */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Image du produit
            </h2>

            <div className="space-y-4">
              {/* Zone de drag & drop */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                  dragActive
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />

                {formData.image ? (
                  <div className="space-y-4">
                    <div className="relative w-48 h-48 mx-auto bg-gray-100 rounded-2xl overflow-hidden">
                      <Image
                        src={URL.createObjectURL(formData.image)}
                        alt="Aperçu"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <label
                        htmlFor="image-upload"
                        className="px-4 py-2 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        Changer l'image
                      </label>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Choisissez un fichier ou glissez-le ici
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        JPG, PNG, GIF - Jusqu'à 10MB
                      </p>
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Parcourir les fichiers
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Link
              href="/admin/produits"
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors text-center"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer le produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
