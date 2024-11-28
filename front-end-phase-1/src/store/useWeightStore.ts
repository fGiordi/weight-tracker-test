import { create } from 'zustand';
import { Weight } from '@/types';

interface WeightState {
  isLoading: boolean,
  weights: Weight[];
  addWeight: (weight: number) => void;
  fetchWeights: () => void;
//   TODO to add more operations here for weight
}

export const useWeightStore = create<WeightState>((set) => ({
  isLoading: false,
  weights: [],
  addWeight: async (value: number) => {
    try {
      set({ isLoading: true });
      const response = await fetch('http://localhost:3001/weights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error('Failed to add weight');
      const newWeight = await response.json();
      set((state) => ({ weights: [newWeight, ...state.weights] }));
    } catch (error) {
      console.error('Error adding weight:', error);
    } finally {
      set({ isLoading: false });
    }
  },
    fetchWeights: async () => {
        try {
          set({ isLoading: true });
          const response = await fetch('http://localhost:3001/weights');
          if (!response.ok) throw new Error('Failed to fetch weights');
          const weights = await response.json();
          set({ weights });
        } catch (error) {

          console.error('Error fetching weights:', error);
        } finally {
          set({ isLoading: false });
        }
    },
}));