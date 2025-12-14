const API_BASE_URL = "http://127.0.0.1:8000";

export interface SignupPayload {
  email: string;
  password: string;
  role: "user" | "creator";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Plan {
  id: number;
  title: string;
  description: string;
  price: number;
  creator_id: number;
  created_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  subscribed_at: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface Follow {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: string;
}

export interface FeedItem {
  plan: Plan;
  creator: User;
}

const getToken = () => localStorage.getItem("access_token");

const getHeaders = (includeAuth = true) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (includeAuth && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }
  return headers;
};

// Auth APIs
export const authAPI = {
  signup: async (payload: SignupPayload) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Signup failed");
    return response.json();
  },

  login: async (payload: LoginPayload) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Login failed");
    const data: AuthResponse = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
  },
};

// Plans APIs
export const plansAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/plans/`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch plans");
    return response.json() as Promise<Plan[]>;
  },

  create: async (payload: {
    title: string;
    description: string;
    price: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/plans/`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to create plan");
    return response.json();
  },
};

// Subscriptions APIs
export const subscriptionsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/subscriptions/`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to fetch subscriptions");
    return response.json() as Promise<Subscription[]>;
  },

  subscribe: async (planId: number) => {
    const response = await fetch(`${API_BASE_URL}/subscriptions/`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ plan_id: planId }),
    });
    if (!response.ok) throw new Error("Failed to subscribe");
    return response.json();
  },
};

// Follows APIs
export const followsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/follows/`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to fetch follows");
    return response.json() as Promise<Follow[]>;
  },

  follow: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/follows/${userId}`, {
      method: "POST",
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to follow user");
    return response.json();
  },
};

// Feed APIs
export const feedAPI = {
  get: async () => {
    const response = await fetch(`${API_BASE_URL}/feed/`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to fetch feed");
    return response.json() as Promise<FeedItem[]>;
  },
};

export default {
  auth: authAPI,
  plans: plansAPI,
  subscriptions: subscriptionsAPI,
  follows: followsAPI,
  feed: feedAPI,
};
