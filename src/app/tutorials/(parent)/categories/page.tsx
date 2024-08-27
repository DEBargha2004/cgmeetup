import { marketplaceCategories } from "@/constants/marketplace-categories";
import TuturialCategoryCard from "../../_components/categort-card";

export default function Page() {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pb-10">
      {marketplaceCategories.map((category, category_idx) => (
        <TuturialCategoryCard key={category_idx} category={category} />
      ))}
    </div>
  );
}
