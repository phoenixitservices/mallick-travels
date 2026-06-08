"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function BusFilters() {
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

  const activeTypes = searchParams.get("busType")?.split(",") || [];
  const activeTimes = searchParams.get("depTime")?.split(",") || [];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-6 sticky top-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <button onClick={() => router.push("?", { scroll: false })} className="text-sm font-semibold text-red-600 hover:text-red-800">
          CLEAR ALL
        </button>
      </div>

      {/* Bus Type */}
      <div>
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Bus Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {["AC", "Non-AC", "Sleeper", "Seater"].map((type) => (
            <button 
              key={type} onClick={() => toggleArrayFilter("busType", type)}
              className={`p-2 border rounded-xl text-center text-sm font-semibold transition-all ${activeTypes.includes(type) ? 'bg-red-50 border-red-500 text-red-700' : 'hover:border-gray-400 bg-white text-gray-600'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="border-t pt-4">
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Departure Time</h4>
        <div className="space-y-3">
          {[
            { id: "morning", label: "Morning (06:00 - 12:00)" },
            { id: "afternoon", label: "Afternoon (12:00 - 18:00)" },
            { id: "evening", label: "Evening (18:00 - 00:00)" },
            { id: "night", label: "Night (00:00 - 06:00)" },
          ].map((time) => (
            <label key={time.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={activeTimes.includes(time.id)} onChange={() => toggleArrayFilter("depTime", time.id)} className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-black">{time.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}