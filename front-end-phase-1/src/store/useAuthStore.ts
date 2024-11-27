import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login?: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
//   TODO to implement login logic
  logout: () => set({ isAuthenticated: false }),
}));