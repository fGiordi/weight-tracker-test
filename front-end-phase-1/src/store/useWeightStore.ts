import { create } from 'zustand';
import { Weight } from '@/types';
import { toast } from '@/hooks/use-toast';
import { baseURL } from '@/config/apiConfig';

interface WeightState {
  isLoading: boolean,
  weights: Weight[];
  addWeight: (weight: number) => void;
  fetchWeights: () => void;
  deleteWeight: (id: string) => Promise<void>;
//   TODO to add more operations here for weight
}

export const useWeightStore = create<WeightState>((set) => ({
  isLoading: false,
  weights: [],
  addWeight: async (value: number) => {
    try {
      set({ isLoading: true });
      const response = await fetch('${baseURL}weights', {
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
        const response = await fetch(`${baseURL}weights`);
        if (!response.ok) throw new Error('Failed to fetch weights');
        const weights = await response.json();
        set({ weights });
    } catch (error) {

        console.error('Error fetching weights:', error);
    } finally {
        set({ isLoading: false });
    }
  },
  deleteWeight: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${baseURL}weights/${id}`, {
        method: 'DELETE',
      });
      console.log('response', response)
      if (!response.ok) throw new Error('Failed to delete weight');
      set((state) => ({
        weights: state.weights.filter((w) => w.id !== id),
      }));
      toast({
        title: 'Weight deleted',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error deleting weight:', error);
      toast({
        title: 'Unable to delete',
        variant: 'destructive'
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));