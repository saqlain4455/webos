import { useState } from "react";

export default function CalculatorApp() {
  const [value, setValue] =
    useState("");

  const calculate = () => {
    try {
      setValue(
        String(eval(value))
      );
    } catch {
      setValue("Error");
    }
  };

  return (
    <div className="p-4">
      <input
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        className="
        w-full
        p-3
        rounded-lg
        bg-slate-800
        border
        border-slate-700
        text-white
        mb-4
        "
      />

      <button
        onClick={calculate}
        className="
        px-4
        py-2
        bg-cyan-600
        rounded-lg
        text-white
        "
      >
        Calculate
      </button>
    </div>
  );
}
