import * as z from "zod";

export const paypalSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" }),
  lastName: z.string({ required_error: "Last Name is required" }),
  address1: z.string({ required_error: "Address is required" }),
  address2: z.string({}),
  city: z.string({}),
  country: z.string({}),
  state: z.string({}),
  postalCode: z.string({}),
});

export type PaypalSchemaType = z.infer<typeof paypalSchema>;
