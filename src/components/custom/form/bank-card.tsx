import { Checkbox } from "@/components/ui/checkbox";
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
import { BankCardSchemaType } from "@/schema/bank-card";
import { useForm } from "react-hook-form";
import InfoSection from "../info-section";
import { Button } from "@/components/ui/button";
import { formatCardNumber } from "@/functions/format-card-details";

export default function BankCardForm({
  form,
  onSubmit,
  submitLabel,
}: {
  form: ReturnType<typeof useForm<BankCardSchemaType>>;
  onSubmit: (data: BankCardSchemaType) => void;
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
              <FormLabel>State</FormLabel>
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
              <FormLabel>Zip/Postal Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator orientation="horizontal" className="lg:col-span-2  my-4" />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(formatCardNumber(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVC</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="lg:col-span-2 my-4" />
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
