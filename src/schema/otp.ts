import * as z from "zod";

export const otpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(6, "Invalid OTP")
    .max(6, "Invalid OTP"),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;
