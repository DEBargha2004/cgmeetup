import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Downloads</TableHead>
          <TableHead>Revenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              {new Date(`2023-${i + 1}-01`).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>$10,000</TableCell>
            <TableCell>5</TableCell>
            <TableCell>$50,000</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
