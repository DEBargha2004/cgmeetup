import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import ContentSectionHeader from "./content-section-header";
import { Rating } from "@/components/custom/rating-info";
import { Circle } from "@mui/icons-material";
import RatingMessageBox from "./rating-message-box";

export default function CourseRating({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader className="flex justify-start items-center gap-2">
        <div className="relative bottom-0.5">
          <Rating numberOfStars={1} rating={1} />
        </div>
        <span>4.7</span>
        <span>course rating</span>
        <Circle className="text-[8px]" />
        <span>399k ratings</span>
      </ContentSectionHeader>
      <div className="grid sm:grid-cols-2 gap-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <RatingMessageBox key={i} />
        ))}
      </div>
    </section>
  );
}
