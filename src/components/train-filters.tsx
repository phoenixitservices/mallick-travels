"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function TrainFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleArrayFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",") || [];
    
    if (current.includes(value)) {
      const updated = current.filter(item => item !== value);
      if (updated.length) params.set(key, updated.join(","));
      else params.delete(key);
    } else {
      params.set(key, [...current, value].join(","));
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const activeClasses = searchParams.get("class")?.split(",") || [];

  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 space-y-6 sticky top-28">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="font-black text-lg text-gray-900">Filter Search</h3>
        <button onClick={() => router.push("?", { scroll: false })} className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full">
          RESET
        </button>
      </div>

      {/* Train Class */}
      <div>
        <h4 className="font-bold mb-3 text-xs text-gray-500 uppercase tracking-wider">Journey Class</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "1A", label: "AC First (1A)" },
            { id: "2A", label: "AC 2-Tier (2A)" },
            { id: "3A", label: "AC 3-Tier (3A)" },
            { id: "CC", label: "AC Chair (CC)" },
            { id: "SL", label: "Sleeper (SL)" },
            { id: "2S", label: "Second (2S)" },
          ].map((cls) => (
            <button 
              key={cls.id} 
              onClick={() => toggleArrayFilter("class", cls.id)}
              className={`p-2.5 border rounded-xl text-center text-xs font-bold transition-all ${
                activeClasses.includes(cls.id) 
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                  : 'hover:border-gray-300 bg-gray-50 text-gray-600'
              }`}
            >
              {cls.label}
            </button>
          ))}
        </div>
      </div>

      {/* Train Types (Optional Checkboxes) */}
      <div className="border-t border-gray-100 pt-5">
        <h4 className="font-bold mb-3 text-xs text-gray-500 uppercase tracking-wider">Train Type</h4>
        <div className="space-y-3">
          {["Rajdhani", "Shatabdi", "Vande Bharat", "Duronto", "Express"].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-black">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}