"use client";

import { CreditCard } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { cn, formUrlQuery, formatAmount } from "@/lib/utils";

export const BankDropdown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    setSelected(account);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={selected?.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger className={cn("w-full gap-3 md:w-[320px]", otherStyles)}>
        <div className="flex items-center gap-2.5 truncate">
          <CreditCard className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{selected?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="w-full md:w-[320px]" align="end">
        <SelectGroup>
          <SelectLabel className="pl-2 text-[12px] font-medium text-muted-foreground">
            Select an account
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.appwriteItemId}
              className="cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-foreground">
                  {account.name}
                </span>
                <span className="tnum text-[12px] text-muted-foreground">
                  {formatAmount(account.currentBalance)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
