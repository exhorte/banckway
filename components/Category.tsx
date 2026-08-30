import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

const Category = ({ category }: CategoryProps) => {
  const {
    circleBg,
    text: { main, count },
    progress: { indicator },
    icon,
  } =
    topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
    topCategoryStyles.default;

  return (
    <div className="flex items-center gap-3">
      <figure
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          circleBg
        )}
      >
        <Image src={icon} width={16} height={16} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between text-[13px]">
          <span className={cn("font-medium", main)}>{category.name}</span>
          <span className={cn("tnum", count)}>{category.count}</span>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          indicatorClassName={indicator}
        />
      </div>
    </div>
  );
};

export default Category;
