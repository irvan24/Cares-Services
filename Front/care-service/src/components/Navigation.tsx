"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";

export default function Navigation() {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { cartCount, cartTotal, getCartItemsForNav } = useCart();
  const cartItems = getCartItemsForNav();
  const router = useRouter();

  const closeMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMobileMenu(false);
      setIsClosing(false);
    }, 300);
  };

  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    // Attendre un court délai pour que l'animation de fermeture commence
    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  // Fermer le menu quand la navigation est terminée
  useEffect(() => {
    if (isNavigating) {
      const handleRouteChange = () => {
        setIsNavigating(false);
        closeMobileMenu();
      };

      // Écouter les changements de route
      window.addEventListener("beforeunload", handleRouteChange);

      return () => {
        window.removeEventListener("beforeunload", handleRouteChange);
      };
    }
  }, [isNavigating]);
  return (
    <>
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      <header className="text-white" style={{ backgroundColor: "#3f3f3f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/care.png"
                  alt="CARE Services"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Navigation - Absolument centrée */}
            <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Accueil
              </Link>
              <Link
                href="/reservation"
                className="hover:text-cyan-400 transition-colors"
              >
                Réservation
              </Link>
              <Link
                href="/boutique"
                className="hover:text-cyan-400 transition-colors"
              >
                Boutique
              </Link>
            </nav>

            {/* Contact & CTA */}
            <div className="flex items-center space-x-4 ml-auto">
              <div className="hidden lg:flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {/* lien tel = <a> car externe */}
                <a
                  href="tel:0123456789"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +33 6 75 32 98 76
                </a>
              </div>

              {/* Panier avec dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className="relative hover:text-cyan-400 transition-colors"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Dropdown du panier */}
                {showCartDropdown && (
                  <>
                    {/* Overlay pour fermer en cliquant à l'extérieur */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCartDropdown(false)}
                    />

                    {/* Contenu du dropdown */}
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 text-gray-900">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold">Mon Panier</h3>
                        <button
                          onClick={() => setShowCartDropdown(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Contenu */}
                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.length === 0 ? (
                          <div className="p-8 text-center">
                            <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">
                              Votre panier est vide
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 space-y-4">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-0"
                              >
                                {item.image && (
                                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-gray-500 text-xs">
                                    Quantité: {item.quantity}
                                  </p>
                                  <p className="text-cyan-600 font-bold text-sm">
                                    {(item.price * item.quantity).toFixed(2)}€
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer avec total et boutons */}
                      {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="text-xl font-bold text-cyan-600">
                              {cartTotal.toFixed(2)}€
                            </span>
                          </div>
                          <Link
                            href="/panier"
                            onClick={() => setShowCartDropdown(false)}
                            className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                          >
                            Voir le panier complet
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Menu burger sur mobile, icône utilisateur sur desktop */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="md:hidden hover:text-cyan-400 transition-colors"
              >
                <Bars3Icon className="w-8 h-8" />
              </button>

              <Link
                href="/reservation"
                className="hidden md:block hover:text-cyan-400 transition-colors"
                title="Mon compte"
              >
                <UserCircleIcon className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar mobile */}
        {showMobileMenu && (
          <>
            {/* Overlay transparent */}
            <div
              className="fixed inset-0 bg-transparent z-40"
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <div
              className={`fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                isClosing ? "translate-x-full" : "translate-x-0"
              }`}
              style={{
                transform: isClosing ? "translateX(100%)" : "translateX(0)",
                animation: !isClosing
                  ? "slideInFromRight 0.3s ease-out"
                  : "none",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="p-6 space-y-4">
                <button
                  onClick={() => handleNavigation("/")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-cyan-600 rounded-lg transition-colors"
                  disabled={isNavigating}
                >
                  Accueil
                </button>
                <button
                  onClick={() => handleNavigation("/reservation")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-cyan-600 rounded-lg transition-colors"
                  disabled={isNavigating}
                >
                  Réservation
                </button>
                <button
                  onClick={() => handleNavigation("/boutique")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-cyan-600 rounded-lg transition-colors"
                  disabled={isNavigating}
                >
                  Boutique
                </button>
              </nav>

              {/* Contact info et déconnexion */}
              <div className="p-6 border-t border-gray-200 mt-auto space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:0123456789"
                    className="hover:text-cyan-600 transition-colors"
                  >
                    +33 6 75 32 98 76
                  </a>
                </div>

                {/* Bouton de déconnexion */}
                <button
                  onClick={() => {
                    // Logique de déconnexion ici
                    console.log("Déconnexion");
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 w-full py-3 px-4 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Se déconnecter</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
