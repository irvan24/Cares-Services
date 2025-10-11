"use client";
import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "Général" },
    { id: "shop", name: "Boutique" },
    { id: "shipping", name: "Livraison" },
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

    // Livraison
    freeShippingThreshold: 50,
    standardShippingCost: 5.99,
    expressShippingCost: 12.99,
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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nom du site
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange("siteName", e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fuseau horaire
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange("timezone", e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Devise
        </label>
        <select
          value={settings.currency}
          onChange={(e) => handleSettingChange("currency", e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
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

  const renderShippingSettings = () => (
    <div className="space-y-4 sm:space-y-6">
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
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
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
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base text-black"
          />
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
      case "shipping":
        return renderShippingSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-14 lg:pl-64">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Paramètres
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Configurez les paramètres de votre boutique
            </p>
          </div>

          <div className="bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto px-3 sm:px-6">
                <div className="flex space-x-4 sm:space-x-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-cyan-500 text-cyan-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {renderTabContent()}

              {/* Save button */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Sauvegarder les paramètres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
