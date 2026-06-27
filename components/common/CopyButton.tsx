"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  text: string;
  label?: string;
};

function normalizeCopyText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function copyWithFallback(text: string) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  textarea.style.fontSize = "16px";

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textarea);

  return copied;
}

export function CopyButton({ text, label = "Copy result" }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const normalizedText = normalizeCopyText(text);
  const hasText = normalizedText.length > 0;

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status]);

  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const textToCopy = normalizeCopyText(text);

    if (!textToCopy) {
      setStatus("error");
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setStatus("copied");
        return;
      }

      const fallbackCopied = copyWithFallback(textToCopy);

      if (fallbackCopied) {
        setStatus("copied");
        return;
      }

      setStatus("error");
    } catch {
      try {
        const fallbackCopied = copyWithFallback(textToCopy);

        if (fallbackCopied) {
          setStatus("copied");
          return;
        }

        setStatus("error");
      } catch {
        setStatus("error");
      }
    }
  }

  const buttonLabel =
    status === "copied"
      ? "Copied"
      : status === "error"
        ? "Copy failed"
        : label;

  return (
    <div className="grid gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleCopy}
        disabled={!hasText}
        className="rounded-full"
      >
        {status === "copied" ? (
          <Check className="mr-2 h-4 w-4" />
        ) : (
          <Copy className="mr-2 h-4 w-4" />
        )}

        {buttonLabel}
      </Button>

      {status === "error" ? (
        <p className="text-xs leading-5 text-red-600 dark:text-red-400">
          Copying failed on this browser. Please try again or select the result
          text manually.
        </p>
      ) : null}
    </div>
  );
}