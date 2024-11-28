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
import { toast } from '@/hooks/use-toast';

export function WeightList() {
  const { weights, fetchWeights } = useWeightStore();

  useEffect(() => {
    fetchWeights();
  }, [fetchWeights]);

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
            <TableCell className="text-left">{weight.value.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}