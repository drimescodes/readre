import { create } from 'zustand';
import axios from 'axios';
import { getApiUrl } from '@/utils/api';


const API_BASE_URL = getApiUrl();

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const response = await axios.get('/auth/me');
      set({ 
        user: response.data, 
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
      return false;
    }
  },

  login: async (token: string) => {
    try {
      const response = await axios.post('/auth/google', { token });
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
}));

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

// Add axios interceptor for 401 responses
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.checkAuth().catch(() => {
        // If checkAuth fails, we're truly unauthorized
        useAuthStore.setState({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false
        });
      });
    }
    return Promise.reject(error);
  }
);