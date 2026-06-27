"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Check, Copy } from "lucide-react";

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

function copyWithTextarea(text: string) {
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
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status]);

  function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const textToCopy = normalizeCopyText(text);

    if (!textToCopy) {
      setStatus("error");
      return;
    }

    const copied = copyWithTextarea(textToCopy);

    if (copied) {
      setStatus("copied");
      return;
    }

    setStatus("error");
  }

  const isCopied = status === "copied";
  const isError = status === "error";

  return (
    <div className="grid gap-2">
      <button
        type="button"
        disabled={!hasText}
        onClick={handleCopy}
        className={`inline-flex select-none items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
          isCopied
            ? "border-emerald-600 bg-emerald-600 text-white"
            : isError
              ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              : "border-slate-300 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-700 dark:hover:bg-emerald-950"
        }`}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}

        {isCopied ? "Copied" : isError ? "Copy failed" : label}
      </button>

      {isCopied ? (
        <p className="text-xs leading-5 text-emerald-700 dark:text-emerald-300">
          Result copied to clipboard.
        </p>
      ) : null}

      {isError ? (
        <p className="text-xs leading-5 text-red-600 dark:text-red-400">
          Copying failed. Please try again or select the result text manually.
        </p>
      ) : null}
    </div>
  );
}