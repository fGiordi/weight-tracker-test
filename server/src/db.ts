type Weight = {
    id: number;
    value: number;
    date: Date;
  };
  
//   In memory DB using Map
let weights = new Map<number, Weight>([
    [1, { id: 1, value: 70.5, date: new Date('2024-03-20') }],
    [2, { id: 2, value: 71.2, date: new Date('2024-03-21') }],
    [3, { id: 3, value: 70.8, date: new Date('2024-03-22') }],
  ]);
  
  export const db = {
    weights: {
      findAll: () => Array.from(weights.values()),

      findById: (id: number) => weights.get(id) || null,

      create: (weight: { value: number }) => {
        if (weight.value <= 0) throw new Error('Invalid weight value');
        const newWeight: Weight = {
          id: weights.size + 1, // Incremental numeric ID
          value: weight.value,
          date: new Date(),
        };
        weights.set(newWeight.id, newWeight);
        return newWeight;
      },

      update: (id: number, weight: { value?: number }) => {
        if (!weights.has(id)) return null;
        if (weight.value !== undefined && weight.value <= 0) throw new Error('Invalid weight value');
        const updatedWeight = { ...weights.get(id)!, ...weight };
        weights.set(id, updatedWeight);
        return updatedWeight;
      },

      delete: (id: number) => weights.delete(id),
    },
  };
  