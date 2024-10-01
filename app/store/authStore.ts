import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  isRefreshing: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isRefreshing: false,
  login: async (token: string) => {
    try {
      const response = await axios.post('/auth/google', { token });
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        accessToken: response.data.access_token,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  initAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        set({ 
          user: response.data.user, 
          isAuthenticated: true,
          accessToken: token,
        });
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        set({ user: null, isAuthenticated: false, accessToken: null });
      }
    }
  },
  
  logout: async () => {
    try {
      await axios.post('/auth/logout');
      set({ user: null, isAuthenticated: false, accessToken: null });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
  refreshToken: async () => {
    if (get().isRefreshing) return false;
    
    set({ isRefreshing: true });
    try {
      const response = await axios.post('/auth/refresh');
      set({ 
        accessToken: response.data.access_token,
        isAuthenticated: true,
        user: response.data.user,
        isRefreshing: false
      });
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      set({ user: null, isAuthenticated: false, accessToken: null, isRefreshing: false });
      return false;
    }
  },
}));

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

// Axios interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore.getState();
      const refreshSuccess = await authStore.refreshToken();
      if (refreshSuccess) {
        originalRequest.headers['Authorization'] = `Bearer ${authStore.accessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);