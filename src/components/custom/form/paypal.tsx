"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaypalSchemaType } from "@/schema/paypal";
import { useForm } from "react-hook-form";
import InfoSection from "../info-section";
import { Checkbox } from "@/components/ui/checkbox";

export default function PayPalForm({
  form,
  onSubmit,
  submitLabel,
}: {
  form: ReturnType<typeof useForm<PaypalSchemaType>>;
  onSubmit: (data: PaypalSchemaType) => void;
  submitLabel?: string;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Address Line 2 - Suite number / apt</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip / Postal Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4 lg:col-span-2" />
        <div className="lg:col-span-2 flex justify-start items-start gap-2">
          <Checkbox />
          <span>
            Save this payment information for future ArtStation Marketplace and
            Prints purchases.
          </span>
        </div>
        <InfoSection className="lg:col-span-2 border-l-2" />
        <Button
          variant={"outline"}
          className="bg-transparent hover:bg-lightAccent"
        >
          Cancel
        </Button>
        <Button type="submit">{submitLabel ?? "Submit"}</Button>
      </form>
    </Form>
  );
}
