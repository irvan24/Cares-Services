// Service pour les produits - API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

export interface Product {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  price: number;
  category: string;
  rating?: number;
  reviews?: number;
  in_stock: boolean;
  badge?: string;
  image?: string;
  images?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

class ProductsService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur de requête");
      }

      return data;
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  // Récupérer tous les produits
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>("/products");
  }

  // Récupérer un produit par ID
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/products/${id}`);
  }

  // Créer un nouveau produit
  async createProduct(
    productData: Partial<Product>
  ): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  // Mettre à jour un produit
  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<ApiResponse<Product>> {
    return this.makeRequest<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  }

  // Supprimer un produit
  async deleteProduct(id: string): Promise<ApiResponse<null>> {
    return this.makeRequest<null>(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Récupérer toutes les catégories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.makeRequest<Category[]>("/products/categories");
  }

  // Créer une nouvelle catégorie
  async createCategory(
    categoryData: Partial<Category>
  ): Promise<ApiResponse<Category>> {
    return this.makeRequest<Category>("/products/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  // Rechercher des produits
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>(
      `/products?search=${encodeURIComponent(query)}`
    );
  }

  // Filtrer les produits par catégorie
  async getProductsByCategory(
    category: string
  ): Promise<ApiResponse<Product[]>> {
    return this.makeRequest<Product[]>(
      `/products?category=${encodeURIComponent(category)}`
    );
  }
}

export const productsService = new ProductsService();
