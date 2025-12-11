// Authentication and User Management Enums
export type UserRole = 'user' | 'admin';
export type UserStatus = 'active' | 'inactive';
export type ThemeMode = 'light' | 'dark';
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

// User and Authentication Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
  timestamp: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  age?: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
  role?: UserRole;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  status: number;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: string;
}

// Store Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}