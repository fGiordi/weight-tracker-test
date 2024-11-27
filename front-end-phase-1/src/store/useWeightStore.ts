import { create } from 'zustand';
import { Weight } from '@/types';

interface WeightState {
  weights: Weight[];
  addWeight: (weight: number) => void;
//   TODO to add more operations here for weight
}

export const useWeightStore = create<WeightState>((set) => ({
  weights: [
    { id: crypto.randomUUID(), value: 70.5, date: new Date('2024-03-20') },
    { id: crypto.randomUUID(), value: 71.2, date: new Date('2024-03-21') },
    { id: crypto.randomUUID(), value: 70.8, date: new Date('2024-03-22') },
  ],
  addWeight: (weight: number) =>
    set((state) => ({
      weights: [
        ...state.weights,
        {
          id: crypto.randomUUID(),
          value: weight,
          date: new Date(),
        },
      ],
    })),
}));