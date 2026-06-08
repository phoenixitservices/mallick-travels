"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftRight, Calendar, MapPin } from "lucide-react";

export default function TrainSearch() {
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
    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-black max-w-5xl mx-auto border border-white/50">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* From Station */}
        <div className="relative border border-gray-200 bg-white rounded-2xl p-3 hover:border-blue-500 transition-colors w-full shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MapPin size={12}/> From Station</label>
          <input
            type="text"
            name="from"
            placeholder="Howrah (HWH)"
            defaultValue={searchParams.get("from") || ""}
            className="w-full text-lg font-bold bg-transparent outline-none mt-1 text-gray-900 placeholder:text-gray-300"
          />
        </div>

        {/* Swap Icon */}
        <div className="hidden md:flex w-12 h-12 rounded-full bg-blue-50 border border-blue-100 items-center justify-center shrink-0 shadow-inner z-10 -mx-6">
          <ArrowLeftRight className="text-blue-600" size={18} />
        </div>

        {/* To Station */}
        <div className="relative border border-gray-200 bg-white rounded-2xl p-3 hover:border-blue-500 transition-colors w-full pl-8 md:pl-4 shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MapPin size={12}/> To Station</label>
          <input
            type="text"
            name="to"
            placeholder="New Delhi (NDLS)"
            defaultValue={searchParams.get("to") || ""}
            className="w-full text-lg font-bold bg-transparent outline-none mt-1 text-gray-900 placeholder:text-gray-300"
          />
        </div>

        {/* Date of Journey */}
        <div className="relative border border-gray-200 bg-white rounded-2xl p-3 hover:border-blue-500 transition-colors w-full shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Calendar size={12}/> Travel Date</label>
          <input
            type="date"
            name="date"
            defaultValue={searchParams.get("date") || ""}
            className="w-full text-lg font-bold bg-transparent outline-none mt-1 text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full md:w-auto px-8 py-4 h-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 shrink-0">
          Search Trains
        </button>
      </form>
    </div>
  );
}