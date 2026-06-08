"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BusSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const date = formData.get("date") as string;

    const params = new URLSearchParams(searchParams.toString());
    
    if (from) params.set("from", from); else params.delete("from");
    if (to) params.set("to", to); else params.delete("to");
    if (date) params.set("date", date); else params.delete("date");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-black max-w-5xl mx-auto border border-gray-100">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* From */}
        <div className="relative border rounded-xl p-3 hover:border-red-500 transition-colors w-full">
          <label className="block text-xs font-semibold text-gray-500 uppercase">From</label>
          <input
            type="text"
            name="from"
            placeholder="Kolkata"
            defaultValue={searchParams.get("from") || ""}
            className="w-full text-lg font-bold bg-transparent outline-none mt-1"
          />
        </div>

        {/* Swap Icon */}
        <div className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center shrink-0 shadow-inner z-10 -mx-6">
          <span className="text-gray-400 font-bold">⇄</span>
        </div>

        {/* To */}
        <div className="relative border rounded-xl p-3 hover:border-red-500 transition-colors w-full pl-8 md:pl-3">
          <label className="block text-xs font-semibold text-gray-500 uppercase">To</label>
          <input
            type="text"
            name="to"
            placeholder="Siliguri"
            defaultValue={searchParams.get("to") || ""}
            className="w-full text-lg font-bold bg-transparent outline-none mt-1"
          />
        </div>

        {/* Date */}
        <div className="relative border rounded-xl p-3 hover:border-red-500 transition-colors w-full">
          <label className="block text-xs font-semibold text-gray-500 uppercase">Date of Journey</label>
          <input
            type="date"
            name="date"
            className="w-full text-lg font-bold bg-transparent outline-none mt-1"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-lg font-bold rounded-xl transition-all shadow-lg shrink-0">
          SEARCH BUSES
        </button>
      </form>
    </div>
  );
}