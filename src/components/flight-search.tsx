"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FlightSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States for dynamic selections
  const [tripType, setTripType] = useState("oneway");
  const [fareType, setFareType] = useState("regular");
  const [showTravellers, setShowTravellers] = useState(false);
  
  // Passenger states (Max 9 total)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");

  const totalTravellers = adults + children + infants;

  const handleTravellerChange = (type: string, operation: "add" | "sub") => {
    if (operation === "add" && totalTravellers >= 9) return; // Max 9 logic
    
    if (type === "adults") {
      if (operation === "add") setAdults(a => a + 1);
      else if (operation === "sub" && adults > 1) setAdults(a => a - 1);
    }
    if (type === "children") {
      if (operation === "add") setChildren(c => c + 1);
      else if (operation === "sub" && children > 0) setChildren(c => c - 1);
    }
    if (type === "infants") {
      if (operation === "add" && infants < adults) setInfants(i => i + 1); // Max 1 infant per adult
      else if (operation === "sub" && infants > 0) setInfants(i => i - 1);
    }
  };

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
    
    params.set("tripType", tripType);
    params.set("fareType", fareType);
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("infants", infants.toString());
    params.set("class", cabinClass);

    setShowTravellers(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-black max-w-6xl mx-auto border border-gray-100">
      {/* Top Bar - Trip Type */}
      <div className="flex gap-6 mb-6 pb-4 border-b">
        {["oneway", "roundtrip", "multicity"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-700">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === type} 
              onChange={() => setTripType(type)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            {type === "oneway" ? "One Way" : type === "roundtrip" ? "Round Trip" : "Multi City"}
          </label>
        ))}
      </div>

      <form onSubmit={handleSearch} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* From & To */}
          <div className="relative border rounded-xl p-3 hover:border-blue-500 transition-colors">
            <label className="block text-xs font-semibold text-gray-500 uppercase">From</label>
            <input
              type="text"
              name="from"
              placeholder="Delhi (DEL)"
              defaultValue={searchParams.get("from") || ""}
              className="w-full text-lg font-bold bg-transparent outline-none mt-1"
            />
          </div>

          <div className="relative border rounded-xl p-3 hover:border-blue-500 transition-colors">
            <label className="block text-xs font-semibold text-gray-500 uppercase">To</label>
            <input
              type="text"
              name="to"
              placeholder="Mumbai (BOM)"
              defaultValue={searchParams.get("to") || ""}
              className="w-full text-lg font-bold bg-transparent outline-none mt-1"
            />
          </div>

          {/* Dates */}
          <div className="relative border rounded-xl p-3 hover:border-blue-500 transition-colors">
            <label className="block text-xs font-semibold text-gray-500 uppercase">Departure</label>
            <input
              type="date"
              name="date"
              className="w-full text-lg font-bold bg-transparent outline-none mt-1"
            />
          </div>

          {/* Travellers & Class */}
          <div className="relative border rounded-xl p-3 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => setShowTravellers(!showTravellers)}>
            <label className="block text-xs font-semibold text-gray-500 uppercase">Travellers & Class</label>
            <div className="mt-1 font-bold text-lg">
              {totalTravellers} Traveller{totalTravellers > 1 ? 's' : ''}
            </div>
            <div className="text-xs text-gray-500 capitalize">{cabinClass}</div>
          </div>
        </div>

        {/* Travellers Dropdown */}
        {showTravellers && (
          <div className="absolute right-0 top-24 mt-2 w-80 bg-white border shadow-2xl rounded-xl p-6 z-50">
            <h4 className="font-bold mb-4">Travellers (Max 9)</h4>
            
            <div className="space-y-4 mb-6">
              {[
                { type: "adults", label: "Adults (12+ yrs)", val: adults },
                { type: "children", label: "Children (2-12 yrs)", val: children },
                { type: "infants", label: "Infants (0-2 yrs)", val: infants },
              ].map((item) => (
                <div key={item.type} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => handleTravellerChange(item.type, "sub")} className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50">-</button>
                    <span className="w-4 text-center font-bold">{item.val}</span>
                    <button type="button" onClick={() => handleTravellerChange(item.type, "add")} className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50">+</button>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-bold mb-3 border-t pt-4">Cabin Class</h4>
            <div className="grid grid-cols-2 gap-2">
              {["economy", "premium", "business", "first"].map((cls) => (
                <button
                  key={cls} type="button" onClick={() => setCabinClass(cls)}
                  className={`p-2 text-xs font-semibold rounded-lg border capitalize ${cabinClass === cls ? 'bg-blue-50 border-blue-600 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  {cls.replace("premium", "Premium Economy")}
                </button>
              ))}
            </div>
            
            <button type="button" onClick={() => setShowTravellers(false)} className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-bold">Apply</button>
          </div>
        )}

        {/* Bottom Bar - Special Fares & Search */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-500 mr-2 py-2">Select Fare Type:</span>
            {[
              { id: "regular", label: "Regular Fares" },
              { id: "ndc", label: "NDC Fares" },
              { id: "series", label: "Series Fares" },
              { id: "student", label: "Student Fares" },
            ].map((fare) => (
              <label key={fare.id} className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${fareType === fare.id ? 'bg-blue-100 border-blue-600 text-blue-800' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                <input type="radio" className="hidden" checked={fareType === fare.id} onChange={() => setFareType(fare.id)} />
                {fare.label}
              </label>
            ))}
          </div>

          <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30">
            SEARCH FLIGHTS
          </button>
        </div>
      </form>
    </div>
  );
}