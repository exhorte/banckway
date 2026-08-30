"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
      >
        <ArrowLeft className="size-4" />
        Prev
      </Button>
      <p className="tnum text-[13px] text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
};
