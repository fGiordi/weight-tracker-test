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
//    TODO update this with backend logic later
    if (
        email === 'test@example.com' && 
        password === 'password123'
    ) {
        set({ isAuthenticated: true });
    }
    return true;

    } catch (error) {
    console.error('Login failed:', error);
    toast({ title: "Error not authorized", variant: 'destructive' });
    return false;
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));