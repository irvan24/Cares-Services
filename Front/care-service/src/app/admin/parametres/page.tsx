"use client";
import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "Général" },
    { id: "shop", name: "Boutique" },
    { id: "payment", name: "Paiement" },
    { id: "shipping", name: "Livraison" },
    { id: "notifications", name: "Notifications" },
  ];

  const [settings, setSettings] = useState({
    // Général
    siteName: "Care Service",
    siteDescription: "Service de lavage automobile professionnel à domicile",
    adminEmail: "admin@careservice.com",
    timezone: "Europe/Paris",
    language: "fr",

    // Boutique
    currency: "EUR",
    taxRate: 20,
    enableReviews: true,
    enableInventory: true,

    // Paiement
    stripeEnabled: false,
    paypalEnabled: false,
    bankTransferEnabled: true,

    // Livraison
    freeShippingThreshold: 50,
    standardShippingCost: 5.99,
    expressShippingCost: 12.99,

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    userNotifications: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Ici, vous sauvegarderiez les paramètres
    alert("Paramètres sauvegardés avec succès !");
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nom du site
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange("siteName", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description du site
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) =>
            handleSettingChange("siteDescription", e.target.value)
          }
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email administrateur
        </label>
        <input
          type="email"
          value={settings.adminEmail}
          onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fuseau horaire
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange("timezone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Langue
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderShopSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Devise
        </label>
        <select
          value={settings.currency}
          onChange={(e) => handleSettingChange("currency", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dollar ($)</option>
          <option value="GBP">Livre (£)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Taux de TVA (%)
        </label>
        <input
          type="number"
          value={settings.taxRate}
          onChange={(e) =>
            handleSettingChange("taxRate", parseInt(e.target.value))
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableReviews"
            checked={settings.enableReviews}
            onChange={(e) =>
              handleSettingChange("enableReviews", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="enableReviews"
            className="ml-2 block text-sm text-gray-900"
          >
            Activer les avis clients
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableInventory"
            checked={settings.enableInventory}
            onChange={(e) =>
              handleSettingChange("enableInventory", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="enableInventory"
            className="ml-2 block text-sm text-gray-900"
          >
            Gestion des stocks
          </label>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="stripeEnabled"
            checked={settings.stripeEnabled}
            onChange={(e) =>
              handleSettingChange("stripeEnabled", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="stripeEnabled"
            className="ml-2 block text-sm text-gray-900"
          >
            Stripe
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="paypalEnabled"
            checked={settings.paypalEnabled}
            onChange={(e) =>
              handleSettingChange("paypalEnabled", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="paypalEnabled"
            className="ml-2 block text-sm text-gray-900"
          >
            PayPal
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="bankTransferEnabled"
            checked={settings.bankTransferEnabled}
            onChange={(e) =>
              handleSettingChange("bankTransferEnabled", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="bankTransferEnabled"
            className="ml-2 block text-sm text-gray-900"
          >
            Virement bancaire
          </label>
        </div>
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seuil livraison gratuite (€)
        </label>
        <input
          type="number"
          value={settings.freeShippingThreshold}
          onChange={(e) =>
            handleSettingChange(
              "freeShippingThreshold",
              parseFloat(e.target.value)
            )
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Coût livraison standard (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.standardShippingCost}
            onChange={(e) =>
              handleSettingChange(
                "standardShippingCost",
                parseFloat(e.target.value)
              )
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Coût livraison express (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.expressShippingCost}
            onChange={(e) =>
              handleSettingChange(
                "expressShippingCost",
                parseFloat(e.target.value)
              )
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={settings.emailNotifications}
            onChange={(e) =>
              handleSettingChange("emailNotifications", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="emailNotifications"
            className="ml-2 block text-sm text-gray-900"
          >
            Notifications par email
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={settings.smsNotifications}
            onChange={(e) =>
              handleSettingChange("smsNotifications", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="smsNotifications"
            className="ml-2 block text-sm text-gray-900"
          >
            Notifications par SMS
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="orderNotifications"
            checked={settings.orderNotifications}
            onChange={(e) =>
              handleSettingChange("orderNotifications", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="orderNotifications"
            className="ml-2 block text-sm text-gray-900"
          >
            Notifications de commandes
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="userNotifications"
            checked={settings.userNotifications}
            onChange={(e) =>
              handleSettingChange("userNotifications", e.target.checked)
            }
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="userNotifications"
            className="ml-2 block text-sm text-gray-900"
          >
            Notifications d'utilisateurs
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "shop":
        return renderShopSettings();
      case "payment":
        return renderPaymentSettings();
      case "shipping":
        return renderShippingSettings();
      case "notifications":
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">
          Configurez les paramètres de votre boutique
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}

          {/* Save button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Sauvegarder les paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
