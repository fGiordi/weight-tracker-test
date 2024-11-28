import { useEffect } from 'react';
import { useWeightStore } from '@/store/useWeightStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { EditWeight } from './EditWeight';

export function WeightList() {
  const { weights, fetchWeights, deleteWeight, isLoading } = useWeightStore();

  const handleDelete = async (id: string) => {
    await deleteWeight(id);
  };

  useEffect(() => {
    fetchWeights();
  }, [fetchWeights]);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Date</TableHead>
          <TableHead>Weight (kg)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weights.map((weight) => (
          <TableRow key={weight.id}>
            <TableCell className="text-left">
              <strong className="text-left">{new Date(weight.date).toLocaleDateString()}</strong>
            </TableCell>
            <TableCell className="text-left">{Number(weight.value).toFixed(1)}</TableCell>
            <TableCell className="text-right space-x-2">
              <EditWeight weight={weight} />  
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Weight Entry</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this weight entry? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(weight.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}