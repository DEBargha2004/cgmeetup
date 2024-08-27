import { cn } from "@/lib/utils";
import { TuturialCardListView } from "@/components/custom/tutorials-list-container";

export default function MarketplaceTrendingPage() {
  return (
    <div className="lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3">
      <div
        className={cn(
          "xl:col-span-2 col-span-3",
          "flex flex-col gap-4",
          "h-fit"
        )}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <TuturialCardListView key={i} />
        ))}
      </div>
      <div
        className={cn(
          "col-span-3 xl:col-span-1",
          "space-y-3 xl:max-w-[400px] h-[350px] px-2",
          "bg-golden sm:sticky sm:top-0"
        )}
      ></div>
    </div>
  );
}
