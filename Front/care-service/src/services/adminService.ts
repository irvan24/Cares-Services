// Service pour les fonctionnalités admin
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

// Types pour les données admin
export interface DashboardStats {
  stats: {
    products: number;
    orders: number;
    users: number;
    revenue: number;
    variations: {
      products: number;
      users: number;
      orders: number;
      revenue: number;
    };
  };
  ordersByStatus: {
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  revenueChart: Array<{
    date: string;
    revenue: number;
    label: string;
    fullDate: string;
  }>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  shipping_address: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  customer: {
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  products: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Fonction utilitaire pour les requêtes avec authentification
async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin-token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Dashboard
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await authenticatedFetch("/dashboard/stats");
    return response.data;
  },

  async getRecentOrders(): Promise<Order[]> {
    const response = await authenticatedFetch("/dashboard/recent-orders");
    return response.data;
  },

  async getRevenueChart(
    period: string = "month"
  ): Promise<Array<{ date: string; revenue: number }>> {
    const response = await authenticatedFetch(
      `/dashboard/revenue-chart?period=${period}`
    );
    return response.data;
  },
};

// Produits
export const productsService = {
  async getAll(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
    } = {}
  ): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await authenticatedFetch(
      `/admin/products?${searchParams}`
    );
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await authenticatedFetch(`/admin/products/${id}`);
    return response.data;
  },

  async create(
    product: Omit<Product, "id" | "created_at" | "updated_at">
  ): Promise<Product> {
    const response = await authenticatedFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    return response.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await authenticatedFetch(`/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedFetch(`/admin/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Catégories
export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const response = await authenticatedFetch("/admin/categories");
    return response.data;
  },

  async getById(id: string): Promise<Category> {
    const response = await authenticatedFetch(`/admin/categories/${id}`);
    return response.data;
  },

  async create(
    category: Omit<Category, "id" | "created_at" | "updated_at">
  ): Promise<Category> {
    const response = await authenticatedFetch("/admin/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    return response.data;
  },

  async update(id: string, category: Partial<Category>): Promise<Category> {
    const response = await authenticatedFetch(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedFetch(`/admin/categories/${id}`, {
      method: "DELETE",
    });
  },
};

// Commandes
export const ordersService = {
  async getAll(
    params: {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
    } = {}
  ): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await authenticatedFetch(`/admin/orders?${searchParams}`);
    return response.data;
  },

  async getById(
    id: string
  ): Promise<Order & { items: Record<string, unknown>[] }> {
    const response = await authenticatedFetch(`/admin/orders/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: string): Promise<Order> {
    const response = await authenticatedFetch(`/admin/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return response.data;
  },

  async getStats(): Promise<Record<string, unknown>> {
    const response = await authenticatedFetch("/admin/orders/stats");
    return response.data;
  },
};

// Utilisateurs
export const usersService = {
  async getAll(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      role?: string;
    } = {}
  ): Promise<PaginatedResponse<User>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await authenticatedFetch(`/admin/users?${searchParams}`);
    return response.data;
  },

  async getById(id: string): Promise<User> {
    const response = await authenticatedFetch(`/admin/users/${id}`);
    return response.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const response = await authenticatedFetch(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedFetch(`/admin/users/${id}`, {
      method: "DELETE",
    });
  },

  async getStats(): Promise<Record<string, unknown>> {
    const response = await authenticatedFetch("/admin/users/stats");
    return response.data;
  },
};
