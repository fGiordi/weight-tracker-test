import { useWeightStore } from '@/store/useWeightStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function WeightList() {
  const weights = useWeightStore((state) => state.weights);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Weight (kg)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weights.map((weight) => (
          <TableRow key={weight.id}>
            <TableCell>
              {weight.date.toLocaleDateString()}
            </TableCell>
            <TableCell>{weight.value.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}