import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function InfoSection({
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <div
      className={cn("p-4 bg-lightAccent border-l border-primary", className)}
      {...props}
    >
      <article>
        By choosing to save your payment information, this payment method will
        be selected as the default for all ArtStation purchases. You can delete
        your saved payment information anytime by logging in to your ArtStation
        account and removing your information in "Billing and Shipping" section
        of the user settings.
      </article>
    </div>
  );
}
