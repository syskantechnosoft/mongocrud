import axios, { type AxiosInstance } from 'axios';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  UpdateUserData,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiration
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await this.client.post<AuthResponse>('/api/v1/auth/login', credentials);
    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await this.client.post<AuthResponse>('/api/v1/auth/register', userData);
    return data;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const { data } = await this.client.get<ApiResponse<User>>('/api/v1/auth/me');
    return data;
  }

  async logout(): Promise<ApiResponse<void>> {
    const { data } = await this.client.post<ApiResponse<void>>('/api/v1/auth/logout');
    return data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    const { data } = await this.client.put<ApiResponse<void>>('/api/v1/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return data;
  }

  // User endpoints
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    isActive?: boolean;
    sort?: string;
  }): Promise<PaginatedResponse<User>> {
    const { data } = await this.client.get<PaginatedResponse<User>>('/api/v1/users', { params });
    return data;
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    const { data } = await this.client.get<ApiResponse<User>>(`/api/v1/users/${id}`);
    return data;
  }

  async createUser(userData: RegisterData): Promise<ApiResponse<User>> {
    const { data } = await this.client.post<ApiResponse<User>>('/api/v1/users', userData);
    return data;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<ApiResponse<User>> {
    const { data } = await this.client.put<ApiResponse<User>>(`/api/v1/users/${id}`, userData);
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.client.delete(`/api/v1/users/${id}`);
  }
}

export const apiClient = new ApiClient();