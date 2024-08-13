import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import productimage from "@/../public/images/profile-1.jpg";

export default function Page() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Buyer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Image
                src={productimage}
                alt="product-image"
                height={200}
                width={200}
                className="h-[150px] w-[150px]"
              />
              <span>Modern 3D Gun Model Design</span>
            </TableCell>
            <TableCell>Rashid Khan</TableCell>
            <TableCell>rashidkhan34@gmail.com</TableCell>
            <TableCell>2023-01-01</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
