import { cn } from "@/lib/utils";
import { TutorialCategory } from "@/types/tutorial";
import Link from "next/link";

export default function TuturialCategoryCard({
  category
}: {
  category: TutorialCategory;
}) {
  return (
    <div
      className={cn(
        "w-full aspect-video rounded",
        "flex flex-col items-center justify-center gap-4",
        "transition-all bg-lightAccent/60 hover:bg-lightAccent"
      )}
    >
      <Link href={""}>
        <p className="text-lg cursor-pointer hover:text-primary">
          {category.title}
        </p>
      </Link>
      <span className="text-sm opacity-70">{category.description}</span>
    </div>
  );
}
