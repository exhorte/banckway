"use client";

import { Check, Copy as CopyIcon } from "lucide-react";
import { useState } from "react";

const Copy = ({ title }: { title: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className="flex w-full max-w-[320px] items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-left transition-colors hover:bg-muted"
    >
      <span className="tnum line-clamp-1 text-[12px] font-medium text-muted-foreground">
        {title}
      </span>
      {hasCopied ? (
        <Check className="size-4 shrink-0 text-brand-600" />
      ) : (
        <CopyIcon className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
};

export default Copy;
