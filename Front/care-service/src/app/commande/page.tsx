"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useCart } from "../../contexts/CartContext";
import { products } from "../../data/products";
import {
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface DeliveryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryOption: "standard" | "express" | "relay";
  paymentMethod: "card" | "paypal" | "cash";
  notes?: string;
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DeliveryForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    deliveryOption: "standard",
    paymentMethod: "card",
    notes: "",
  });

  // Obtenir les détails des articles du panier
  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);

  // Calculer les frais de livraison
  const getDeliveryFee = () => {
    switch (formData.deliveryOption) {
      case "standard":
        return cartTotal > 50 ? 0 : 4.99;
      case "express":
        return 9.99;
      case "relay":
        return 2.99;
      default:
        return 0;
    }
  };

  const deliveryFee = getDeliveryFee();
  const totalWithDelivery = cartTotal + deliveryFee;

  // Gérer les changements de formulaire
  const handleInputChange = (field: keyof DeliveryForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Valider le formulaire
  const validateForm = () => {
    const requiredFields: (keyof DeliveryForm)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
    ];

    return requiredFields.every((field) => formData[field].trim() !== "");
  };

  // Soumettre la commande
  const handleSubmitOrder = () => {
    if (!validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Ici, vous pourriez envoyer la commande à votre backend
    console.log("Commande soumise:", {
      ...formData,
      items: cartItems,
      total: totalWithDelivery,
    });

    // Simuler le succès
    alert("Commande confirmée ! Vous recevrez un email de confirmation.");
    clearCart();
    // Rediriger vers la page de confirmation
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Panier vide
            </h1>
            <p className="text-gray-600 mb-8">
              Votre panier est vide. Ajoutez des produits pour continuer.
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour à la boutique</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/panier"
              className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour au panier</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Finaliser ma commande
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            {/* Étapes */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="font-bold">1</span>
                  </div>
                  <span className="font-semibold">Livraison</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 2
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="font-bold">2</span>
                  </div>
                  <span className="font-semibold">Paiement</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= 3
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="font-bold">3</span>
                  </div>
                  <span className="font-semibold">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Étape 1: Informations de livraison */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations de livraison
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Prénom */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="123 Rue de la Paix"
                      />
                    </div>
                  </div>

                  {/* Ville */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Paris"
                    />
                  </div>

                  {/* Code postal */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="75001"
                    />
                  </div>

                  {/* Options de livraison */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Mode de livraison *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="standard"
                          checked={formData.deliveryOption === "standard"}
                          onChange={(e) =>
                            handleInputChange("deliveryOption", e.target.value)
                          }
                          className="mr-3"
                        />
                        <TruckIcon className="w-6 h-6 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <div className="font-semibold">
                            Livraison standard
                          </div>
                          <div className="text-sm text-gray-600">
                            Livraison sous 3-5 jours ouvrés
                            {cartTotal > 50 ? " - GRATUITE" : " - 4,99€"}
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="express"
                          checked={formData.deliveryOption === "express"}
                          onChange={(e) =>
                            handleInputChange("deliveryOption", e.target.value)
                          }
                          className="mr-3"
                        />
                        <TruckIcon className="w-6 h-6 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <div className="font-semibold">Livraison express</div>
                          <div className="text-sm text-gray-600">
                            Livraison sous 24h - 9,99€
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="relay"
                          checked={formData.deliveryOption === "relay"}
                          onChange={(e) =>
                            handleInputChange("deliveryOption", e.target.value)
                          }
                          className="mr-3"
                        />
                        <TruckIcon className="w-6 h-6 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <div className="font-semibold">Point relais</div>
                          <div className="text-sm text-gray-600">
                            Retrait en point relais - 2,99€
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes de livraison (optionnel)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Instructions spéciales pour la livraison..."
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!validateForm()}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      validateForm()
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              </div>
            )}

            {/* Étape 2: Paiement */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Mode de paiement
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="mr-3"
                    />
                    <CreditCardIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold">Carte bancaire</div>
                      <div className="text-sm text-gray-600">
                        Visa, Mastercard, American Express
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="mr-3"
                    />
                    <CreditCardIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold">PayPal</div>
                      <div className="text-sm text-gray-600">
                        Paiement sécurisé via PayPal
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="mr-3"
                    />
                    <CreditCardIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold">
                        Paiement à la livraison
                      </div>
                      <div className="text-sm text-gray-600">
                        Espèces ou chèque uniquement
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Continuer vers la confirmation
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3: Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Confirmation de commande
                </h2>

                <div className="space-y-6">
                  {/* Récapitulatif des informations */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Informations de livraison
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Nom:</span>{" "}
                        {formData.firstName} {formData.lastName}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {formData.email}
                      </div>
                      <div>
                        <span className="font-semibold">Téléphone:</span>{" "}
                        {formData.phone}
                      </div>
                      <div>
                        <span className="font-semibold">Ville:</span>{" "}
                        {formData.city} {formData.postalCode}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-semibold">Adresse:</span>{" "}
                        {formData.address}
                      </div>
                      <div>
                        <span className="font-semibold">Livraison:</span>{" "}
                        {formData.deliveryOption === "standard"
                          ? "Standard"
                          : formData.deliveryOption === "express"
                          ? "Express"
                          : "Point relais"}
                      </div>
                      <div>
                        <span className="font-semibold">Paiement:</span>{" "}
                        {formData.paymentMethod === "card"
                          ? "Carte bancaire"
                          : formData.paymentMethod === "paypal"
                          ? "PayPal"
                          : "À la livraison"}
                      </div>
                    </div>
                  </div>

                  {/* Garanties */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      Garanties incluses
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">
                          Paiement 100% sécurisé
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">
                          Garantie satisfait ou remboursé
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TruckIcon className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">
                          Suivi de livraison en temps réel
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Confirmer la commande
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Résumé de commande
              </h2>

              {/* Articles */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              {/* Totaux */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{cartTotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Gratuite</span>
                    ) : (
                      `${deliveryFee.toFixed(2)}€`
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total TTC
                    </span>
                    <span className="text-lg font-bold text-cyan-600">
                      {totalWithDelivery.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Garanties */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <TruckIcon className="w-4 h-4" />
                  <span>Livraison rapide</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Garantie 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
