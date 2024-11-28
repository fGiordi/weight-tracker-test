import { useWeightStore } from '@/store/useWeightStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';

interface FormValues {
  value: number;
}

export function AddWeight() {
  const addWeight = useWeightStore((state) => state.addWeight);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    try {
      addWeight(data.value);
      reset()
    } catch (error) {
      console.error("Error adding weight:", error);
    } 
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
          <Input
            type="number"
            step="0.1"
            placeholder="Enter weight (kg)"
            required
            {...register('value', {
              required: 'Weight is required',
              min: { value: 0.1, message: 'Weight must be greater than 0' }, 
              max: { value: 500, message: 'Weight must be less than 500' } 
            })}
          />
          {errors.value && <span className="text-red-500 text-sm">{errors.value.message}</span>}
          <Button type="submit">Add Weight</Button>
        </form>
      </CardContent>
    </Card>
  );
}