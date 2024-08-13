import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { v4 } from "uuid";

export default function Page() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Payment Fee</TableHead>
          <TableHead>Payment Account</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            {new Date(`2023-${i + 1}-01`).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
          <TableCell>UPI</TableCell>
          <TableCell>{v4().substring(0, 8)}</TableCell>
          <TableCell>$10,000</TableCell>
          <TableCell>$1</TableCell>
          <TableCell>XXXX-XXXX-XXXX-1234</TableCell>
          <TableCell>Paid</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
