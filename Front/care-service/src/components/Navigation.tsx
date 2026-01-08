"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCartIcon,
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
    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  useEffect(() => {
    if (isNavigating) {
      const handleRouteChange = () => {
        setIsNavigating(false);
        closeMobileMenu();
      };

      window.addEventListener("beforeunload", handleRouteChange);

      return () => {
        window.removeEventListener("beforeunload", handleRouteChange);
      };
    }
  }, [isNavigating]);

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Navbar flottante en forme de pill */}
      <header className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-5xl mx-auto bg-[#4a4a4a] rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
          {/* Logo CARE */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/care.png"
              alt="CARE Services"
              width={90}
              height={51}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Navigation centrale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#services"
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Nos services
            </Link>
            <Link
              href="/#tarifs"
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Tarifs
            </Link>
            <Link
              href="/reservation"
              className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Reservation
            </Link>
          </div>

          {/* Partie droite */}
          <div className="flex items-center space-x-3">
            {/* Panier avec dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="relative text-white hover:text-gray-300 transition-colors"
                aria-label={`Panier${
                  cartCount > 0 ? ` (${cartCount} articles)` : ""
                }`}
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dropdown du panier */}
              {showCartDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCartDropdown(false)}
                  />
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl z-50 text-gray-900 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                      <h3 className="text-lg font-bold">Mon Panier</h3>
                      <button
                        onClick={() => setShowCartDropdown(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Fermer le panier"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingCartIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                          <p className="text-gray-500 text-sm">
                            Votre panier est vide
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3 pb-3 border-b border-gray-100 last:border-0"
                            >
                              {item.image && (
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                  {item.name}
                                </h4>
                                <p className="text-gray-400 text-xs">
                                  Qté: {item.quantity}
                                </p>
                                <p className="text-cyan-600 font-semibold text-sm">
                                  {(item.price * item.quantity).toFixed(2)}€
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {cartItems.length > 0 && (
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-600">
                            Total:
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {cartTotal.toFixed(2)}€
                          </span>
                        </div>
                        <Link
                          href="/panier"
                          onClick={() => setShowCartDropdown(false)}
                          className="block w-full bg-[#4a4a4a] hover:bg-[#3a3a3a] text-white text-center py-2.5 rounded-full font-medium transition-colors text-sm"
                        >
                          Voir le panier
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Menu burger mobile */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden text-white hover:text-gray-300 transition-colors ml-1"
              aria-label="Ouvrir le menu"
            >
              <Bars3Icon className="w-7 h-7" />
            </button>
          </div>
        </nav>
      </header>

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
            className={`fixed top-0 left-0 h-screen w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
              isClosing ? "-translate-x-full" : "translate-x-0"
            }`}
            style={{
              transform: isClosing ? "translateX(-100%)" : "translateX(0)",
              animation: !isClosing ? "slideInFromLeft 0.3s ease-out" : "none",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
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
                onClick={() => handleNavigation("/#services")}
                className="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#4a4a4a] rounded-lg transition-colors text-lg"
                disabled={isNavigating}
              >
                Nos services
              </button>
              <button
                onClick={() => handleNavigation("/#tarifs")}
                className="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#4a4a4a] rounded-lg transition-colors text-lg"
                disabled={isNavigating}
              >
                Tarifs
              </button>
              <button
                onClick={() => handleNavigation("/reservation")}
                className="block w-full text-left py-4 px-4 text-gray-700 hover:bg-gray-100 hover:text-[#4a4a4a] rounded-lg transition-colors text-lg"
                disabled={isNavigating}
              >
                Reservation
              </button>
            </nav>

            {/* Contact info et déconnexion */}
            <div className="p-6 border-t border-gray-200 flex-shrink-0 space-y-4">
              <div className="flex items-center space-x-3 w-full py-3 px-4">
                <svg
                  className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
                >
                  +33 7 56 87 28 98
                </a>
              </div>

              {/* Bouton de connexion/déconnexion
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                      router.push("/");
                    }}
                    className="flex items-center space-x-3 w-full py-3 px-4 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
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
                ) : (
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      router.push("/admin/login");
                    }}
                    className="flex items-center space-x-3 w-full py-3 px-4 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">Se connecter</span>
                  </button>
                )}
                */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
