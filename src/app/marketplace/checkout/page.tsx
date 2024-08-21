"use client";

import BankCardForm from "@/components/custom/form/bank-card";
import PayPalForm from "@/components/custom/form/paypal";
import { ListContainerCard } from "@/components/custom/list-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
  TableFooter,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { bankCardSchema, BankCardSchemaType } from "@/schema/bank-card";
import { paypalSchema, PaypalSchemaType } from "@/schema/paypal";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBackIos, Help } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

export default function Page() {
  const bankCardForm = useForm<BankCardSchemaType>({
    resolver: zodResolver(bankCardSchema),
  });

  const paypalForm = useForm<PaypalSchemaType>({
    resolver: zodResolver(paypalSchema),
  });

  const handleBankCardFormSubmit = async (data: BankCardSchemaType) => {};

  const handlePaypalFormSubmit = async (data: PaypalSchemaType) => {};

  return (
    <section className="my-10 flex flex-col justify-start items-center">
      <div className="2xl:w-[1400px] xl:w-[1200px] w-full px-2 space-y-4">
        <div className="flex justify-start items-center ">
          <ArrowBackIos fontSize="small" />
          <span>Back to Cart</span>
        </div>
        <div
          className={cn(
            "flex lg:flex-row flex-col lg:justify-center lg:items-start items-center gap-4",
            "w-full",
          )}
        >
          <div className="space-y-2 2xl:w-3/5 lg:w-[55%] w-full shrink-0">
            <h1 className="text-xl">Billing Information</h1>
            <Accordion type="single" className="space-y-2">
              <AccordionItem
                value="bank-card"
                className="space-y-2 bg-card hover:bg-card rounded"
              >
                <AccordionTrigger className="hover:no-underline bg-lightAccent px-2 rounded-t">
                  Bank Card
                </AccordionTrigger>
                <AccordionContent className="px-2">
                  <BankCardForm
                    form={bankCardForm}
                    onSubmit={handleBankCardFormSubmit}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="paypal"
                className="space-y-2 bg-card hover:bg-card rounded"
              >
                <AccordionTrigger className="hover:no-underline bg-lightAccent px-2 rounded-t">
                  Paypal
                </AccordionTrigger>
                <AccordionContent className="px-2">
                  <PayPalForm
                    form={paypalForm}
                    onSubmit={handlePaypalFormSubmit}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full grid gap-2">
            <h1 className="text-xl">Billing Information</h1>
            <div className="bg-lightAccent p-3 w-full flex justify-between items-center">
              <p className="text-lg uppercase">USERNAME</p>
              <p className="text-sm">debarghasaha2</p>
            </div>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="border">ITEMS</TableHead>
                  <TableHead className="border">QTY.</TableHead>
                  <TableHead className="border">PRICE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="border">
                      50 Medieval City 3D Models with Textures | Game Ready |
                      Vol 2
                    </TableCell>
                    <TableCell className="border">1</TableCell>
                    <TableCell className="border">$10,000</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={2}>SUBTOTAL</TableCell>
                  <TableCell>$50,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>TAXES</TableCell>
                  <TableCell>
                    <Help fontSize="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow>
                  <TableCell colSpan={2} className="border ">
                    <div className="space-x-2">
                      <h1 className="text-lg font-semibold inline-block">
                        TOTAL
                      </h1>
                      <span className="text-xs opacity-70">before taxes</span>
                    </div>
                    <p className="text-success">Total Savings USD $11.00</p>
                  </TableCell>
                  <TableCell>
                    <strong>$50,000</strong>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="flex items-center justify-start gap-2 py-2 mt-4">
              <Input placeholder="Enter promo code" />
              <Button>Apply</Button>
            </div>

            <Button>Place Order</Button>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl">More Products</h1>
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <ListContainerCard id={v4()} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
