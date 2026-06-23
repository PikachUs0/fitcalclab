"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  text: string;
  label?: string;
  copiedLabel?: string;
};

export function CopyButton({
  text,
  label = "Copy result",
  copiedLabel = "Copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleCopy}
      className="rounded-full"
    >
      {copied ? (
        <Check className="mr-2 h-4 w-4 text-emerald-600" />
      ) : (
        <Copy className="mr-2 h-4 w-4" />
      )}

      {copied ? copiedLabel : label}
    </Button>
  );
}