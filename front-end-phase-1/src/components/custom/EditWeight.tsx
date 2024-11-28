import { useState } from 'react';
import { Weight } from '@/types/weight';
import { useWeightStore } from '@/store/useWeightStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EditWeightProps {
  weight: Weight;
}

interface FormValues {
  value: number;
}

export function EditWeight({ weight }: EditWeightProps) {
  const [open, setOpen] = useState(false);
  const updateWeight = useWeightStore((state) => state.updateWeight);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { value: weight.value },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateWeight(weight.id, data.value); 
      setOpen(false); 
    } catch (error) {
      // Error handling is already inside the store's updateWeight function
      console.error("Error updating weight:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Weight Entry</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="number"
              step="0.1"
              {...register('value', {
                required: 'Weight is required',
                min: {
                  value: 0.1,
                  message: 'Weight must be greater than 0',
                },
              })}
            />
            {errors.value && <p className="text-red-500">{errors.value.message}</p>}
          </div>
          <div className="space-x-4">
            <AlertDialogAction asChild>
              <Button type="submit">Save Changes</Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
