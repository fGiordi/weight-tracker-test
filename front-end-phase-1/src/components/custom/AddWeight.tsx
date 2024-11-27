import { useState } from 'react';
import { useWeightStore } from '@/store/useWeightStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export function AddWeight() {
  const [weight, setWeight] = useState('');
  const addWeight = useWeightStore((state) => state.addWeight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightValue = parseFloat(weight);
    if(isNaN(weightValue)) return 
    
      addWeight(weightValue);
      setWeight('');
      toast({title: 'Weight added'})
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="number"
            step="0.1"
            placeholder="Enter weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <Button type="submit">Add Weight</Button>
        </form>
      </CardContent>
    </Card>
  );
}