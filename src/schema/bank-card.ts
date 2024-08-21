import * as z from "zod";

export const bankCardSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" }),
  lastName: z.string({ required_error: "Last Name is required" }),
  address1: z
    .string({ required_error: "Address is Required" })
    .min(5, { message: "Minimum of 5 letter is required" }),
  address2: z.string({}),
  city: z.string({}),
  state: z.string({}),
  postalCode: z.string({}),
  country: z.string({}),
  cardNumber: z.string({}).max(12).min(12),
  expiry: z.string().refine((arg) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return expiryRegex.test(arg);
  }),
  cvc: z.string().max(3).min(3),
});

export type BankCardSchemaType = z.infer<typeof bankCardSchema>;
