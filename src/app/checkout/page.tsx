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
import { Add, ArrowBackIos, Delete, Help } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import productImage from "@/../public/images/cover-image.jpg";
import Image from "next/image";
import Link from "next/link";

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
        <Link href="/marketplace">
          <div className="flex justify-start items-center hover:text-primary w-fit">
            <ArrowBackIos fontSize="small" />
            <span>Back to Shopping</span>
          </div>
        </Link>
        <div
          className={cn(
            "flex lg:flex-row flex-col lg:justify-center lg:items-start items-center gap-4",
            "w-full",
          )}
        >
          <div className="space-y-4 2xl:w-3/4 lg:w-[75%] w-full shrink-0">
            {/* <div className="bg-lightAccent p-3 w-full flex justify-between items-center">
              <p className="text-lg uppercase">Digital Products</p>
            </div> */}
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-lightAccent hover:bg-lightAccent">
                  <TableHead className="text-lg text-white whitespace-nowrap">
                    Digital Products
                  </TableHead>
                  <TableHead className=""></TableHead>
                  <TableHead className="">QTY.</TableHead>
                  <TableHead className="">PRICE</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="hover:bg-transparent">
                    <TableCell className="min-w-[132px] w-fit">
                      <Image
                        src={productImage}
                        alt="product-image"
                        height={300}
                        width={300}
                        className="h-[100px] w-[100px] object-cover shrink-0"
                      />
                    </TableCell>
                    <TableCell className="">
                      <p>
                        50 Medieval City 3D Models with Textures | Game Ready |
                        Vol 2
                      </p>
                      &nbsp;
                      <span className="opacity-70 text-xs">
                        By Salmon Reddy
                      </span>
                    </TableCell>
                    <TableCell className="">1</TableCell>
                    <TableCell className="">$10,000</TableCell>
                    <TableCell>
                      <Delete className="opacity-70 cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <h1 className="text-xl">Billing Information</h1>
            <Accordion type="single" className="space-y-2">
              <AccordionItem
                value="bank-card"
                className="space-y-2 bg-card hover:bg-card rounded"
              >
                <AccordionTrigger className="hover:no-underline bg-lightAccent px-6 rounded-t">
                  <Add />
                  <span>Bank Card</span>
                </AccordionTrigger>
                <AccordionContent className="p-4 px-6">
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
                <AccordionTrigger className="hover:no-underline bg-lightAccent px-6 rounded-t">
                  <Add />
                  <span>Paypal</span>
                </AccordionTrigger>
                <AccordionContent className="p-4 px-6">
                  <PayPalForm
                    form={paypalForm}
                    onSubmit={handlePaypalFormSubmit}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full grid gap-2">
            {/* <h1 className="text-xl"></h1> */}

            <Table className="border">
              <TableHeader className="bg-lightAccent hover:bg-lightAccent">
                <TableRow>
                  <TableHead
                    className="text-lg text-white whitespace-nowrap"
                    colSpan={3}
                  >
                    Order Summary
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={2}>SUBTOTAL</TableCell>
                  <TableCell>$50,000</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={2}>TAXES</TableCell>
                  <TableCell>
                    <Help fontSize="small" />
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={2}>Coupon Discount</TableCell>
                  <TableCell>
                    <span>23%</span>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
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
        <div className="space-y-2 pt-10">
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
