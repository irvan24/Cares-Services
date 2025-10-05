"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Types pour le panier
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
}

// Interface du contexte
interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemsForNav: () => CartItem[];
}

// Créer le contexte
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider du contexte
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        setCart([]);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculer le nombre total d'articles
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculer le total du panier
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Ajouter un produit au panier
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si c'est un nouveau produit, l'ajouter au panier
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          category: product.category,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Obtenir les items du panier pour la navigation
  const getCartItemsForNav = (): CartItem[] => {
    return cart;
  };

  const value: CartContextType = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsForNav,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook pour utiliser le contexte
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
