import { baseURL } from '@/config/apiConfig';
import { toast } from '@/hooks/use-toast';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${baseURL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        set({ isAuthenticated: true });
        toast({ title: "Logged in", variant: 'success' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      toast({ title: "Unable to login", variant: 'destructive' });
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));