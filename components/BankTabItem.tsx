"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <span onClick={handleBankChange} className="line-clamp-1">
      {account.name}
    </span>
  );
};
