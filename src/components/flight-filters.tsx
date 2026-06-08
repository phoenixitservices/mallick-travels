"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export default function FlightFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localPrice, setLocalPrice] = useState(searchParams.get("maxPrice") || "20000");
  const currentStops = searchParams.get("stops");
  const currentRefundable = searchParams.get("refundable");

  useEffect(() => {
    setLocalPrice(searchParams.get("maxPrice") || "20000");
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localPrice !== (searchParams.get("maxPrice") || "20000")) {
        updateFilter("maxPrice", localPrice);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localPrice]);

  const clearFilters = () => {
    startTransition(() => {
      router.push("?", { scroll: false });
    });
  };

  const activeAirlines = searchParams.get("airlines")?.split(",") || [];
  const activeTimes = searchParams.get("depTime")?.split(",") || [];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-6 sticky top-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <button onClick={clearFilters} disabled={isPending} className="text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50">
          CLEAR ALL
        </button>
      </div>

      {/* Stops */}
      <div>
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Stops</h4>
        <div className="space-y-2">
          {[
            { value: "0", label: "Non-stop" },
            { value: "1", label: "1 Stop" },
            { value: "2", label: "2+ Stops" }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="stops" value={option.value} checked={currentStops === option.value} onChange={(e) => updateFilter("stops", e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-black">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wide">One Way Price</h4>
          <span className="text-xs font-bold text-gray-900">₹{localPrice}</span>
        </div>
        <input type="range" min="2000" max="50000" step="500" value={localPrice} onChange={(e) => setLocalPrice(e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
      </div>

      {/* Departure Time */}
      <div className="border-t pt-4">
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "morning", label: "Morning", sub: "06:00 - 12:00" },
            { id: "afternoon", label: "Afternoon", sub: "12:00 - 18:00" },
            { id: "evening", label: "Evening", sub: "18:00 - 00:00" },
            { id: "night", label: "Night", sub: "00:00 - 06:00" },
          ].map((time) => (
            <button 
              key={time.id} onClick={() => toggleArrayFilter("depTime", time.id)}
              className={`p-2 border rounded-xl text-center transition-all ${activeTimes.includes(time.id) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'hover:border-gray-400 bg-white text-gray-600'}`}
            >
              <div className="text-sm font-bold">{time.label}</div>
              <div className="text-[10px] opacity-70">{time.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div className="border-t pt-4">
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Airlines</h4>
        <div className="space-y-3">
          {["IndiGo", "Air India", "Vistara", "Akasa Air", "SpiceJet"].map((airline) => (
            <label key={airline} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={activeAirlines.includes(airline)} onChange={() => toggleArrayFilter("airlines", airline)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-black">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fare Type (Refundable) */}
      <div className="border-t pt-4">
        <h4 className="font-bold mb-3 text-sm text-gray-800 uppercase tracking-wide">Fare Options</h4>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" checked={currentRefundable === "true"} onChange={(e) => updateFilter("refundable", e.target.checked ? "true" : "")} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm font-medium text-gray-600 group-hover:text-black">Refundable Fares Only</span>
        </label>
      </div>

    </div>
  );
}