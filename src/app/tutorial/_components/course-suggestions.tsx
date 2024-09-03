import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import ContentSectionHeader from "./content-section-header";
import { TutorialsCard } from "@/components/custom/tutorials-list-container";

export default function CourseSuggestions({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader>Suggested Courses</ContentSectionHeader>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <TutorialsCard id="" key={i} />
        ))}
      </div>
    </section>
  );
}
