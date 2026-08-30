"use client";

import { Landmark } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery, formatAmount } from "@/lib/utils";

const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn("bank-info border-border bg-card", {
        "cursor-pointer hover:border-border hover:shadow-sm": type === "card",
        "border-primary shadow-sm": type === "card" && isActive,
        "rounded-xl": type === "card",
      })}
    >
      <figure className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Landmark className="size-4" />
      </figure>

      <div className="bank-info_content">
        <div className="flex min-w-0 flex-col">
          <h2 className="truncate text-[14px] font-semibold text-foreground">
            {account.name}
          </h2>
          <p className="text-[12px] capitalize text-muted-foreground">
            {account.subtype} {type === "full" ? "account" : ""}
          </p>
        </div>
        <p className="tnum shrink-0 text-[14px] font-semibold text-foreground">
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
