import { HTMLProps } from "react";
import ContentSectionHeader from "./content-section-header";
import { cn } from "@/lib/utils";
import { Circle } from "@mui/icons-material";

export default function CourseRequirements({
  requirements,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { requirements: string[] }) {
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader>Requirements</ContentSectionHeader>
      <div className="space-y-2">
        {requirements?.map((requirement, idx) => (
          <div key={idx} className="flex justify-start items-center gap-5">
            <Circle fontSize="small" className="text-[8px]" />
            <span>{requirement}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
