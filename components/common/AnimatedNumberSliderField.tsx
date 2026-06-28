"use client";

type AnimatedNumberSliderFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  decimals?: number;
  placeholder?: string;
};

export function AnimatedNumberSliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  decimals = 0,
  placeholder,
}: AnimatedNumberSliderFieldProps) {
  const numericValue = Number(value);

  const safeValue =
    Number.isFinite(numericValue) && numericValue >= min && numericValue <= max
      ? numericValue
      : min;

  const percentage = ((safeValue - min) / (max - min)) * 100;
  const inputCharacterLength = Math.max(value.length, 2);
const inputWidth = suffix
  ? `${inputCharacterLength + 0.5}ch`
  : `${Math.max(inputCharacterLength, 3)}ch`;

  function handleInputChange(nextValue: string) {
    if (nextValue === "") {
      onChange("");
      return;
    }

    const cleanedValue = nextValue.replace(",", ".");

    if (!/^\d*\.?\d*$/.test(cleanedValue)) {
      return;
    }

    onChange(cleanedValue);
  }

  function handleInputBlur() {
  if (value === "") {
    return;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    onChange("");
    return;
  }

  const clampedValue = Math.min(Math.max(numberValue, min), max);

  const formattedValue =
    decimals > 0
      ? clampedValue.toFixed(decimals)
      : String(Math.round(clampedValue));

  onChange(formattedValue);
}

  return (
    <div className="grid gap-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="flex justify-center">
  <div className="inline-flex w-fit items-center justify-center gap-1 rounded-full border border-emerald-200 bg-white px-6 py-3 shadow-sm dark:border-emerald-900 dark:bg-slate-900">
    <input
      id={id}
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(event) => handleInputChange(event.target.value)}
      onBlur={handleInputBlur}
      placeholder={placeholder}
      style={{ width: inputWidth }}
className={`bg-transparent text-2xl font-bold tabular-nums text-emerald-700 outline-none placeholder:text-emerald-300 dark:text-emerald-300 dark:placeholder:text-emerald-800 ${
  suffix ? "text-right" : "text-center"
}`}
    />

    {suffix ? (
      <span className="shrink-0 whitespace-nowrap text-lg font-bold text-emerald-700 dark:text-emerald-300">
  {suffix}
</span>
    ) : null}
  </div>
</div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(event) => onChange(event.target.value)}
        aria-label={`${label} slider`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent"
        style={{
          background: `linear-gradient(to right, #0f9f8f 0%, #0f9f8f ${percentage}%, #3f3f3f ${percentage}%, #3f3f3f 100%)`,
        }}
      />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: #0f9f8f;
          cursor: pointer;
          border: 0;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: #0f9f8f;
          cursor: pointer;
          border: 0;
        }
      `}</style>
    </div>
  );
}