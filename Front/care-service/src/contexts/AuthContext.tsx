"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Types pour l'authentification
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "super-admin";
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au montage
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("admin-user");
      const savedToken = localStorage.getItem("admin-token");

      if (savedUser && savedToken) {
        try {
          const userData = JSON.parse(savedUser);

          // Vérifier le token avec le backend
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";
          const response = await fetch(`${API_URL}/auth/admin/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: savedToken }),
          });

          const data = await response.json();

          if (data.success) {
            // Mettre à jour les données utilisateur avec celles du serveur
            const updatedUserData: AdminUser = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
            };
            setUser(updatedUserData);
            localStorage.setItem("admin-user", JSON.stringify(updatedUserData));
          } else {
            // Token invalide, nettoyer le localStorage
            localStorage.removeItem("admin-user");
            localStorage.removeItem("admin-token");
          }
        } catch (error) {
          console.error("Erreur lors de la vérification du token:", error);
          localStorage.removeItem("admin-user");
          localStorage.removeItem("admin-token");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

      const response = await fetch(`${API_URL}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData: AdminUser = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        };

        setUser(userData);
        localStorage.setItem("admin-user", JSON.stringify(userData));
        localStorage.setItem("admin-token", data.token);

        return true;
      } else {
        console.error("Erreur de connexion:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      // Notifier le backend de la déconnexion
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";
      const savedToken = localStorage.getItem("admin-token");

      if (savedToken) {
        await fetch(`${API_URL}/auth/admin/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: savedToken }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("admin-user");
      localStorage.removeItem("admin-token");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
