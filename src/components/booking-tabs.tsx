"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = ["Flights", "Hotels", "Bus", "Train"];

export default function BookingTabs() {
  const router = useRouter();
  const [active, setActive] = useState("Flights");
  const [travellers, setTravellers] = useState(1);
  const [rooms, setRooms] = useState(1); // Hotel er jonno extra room state
  const [flightClass, setFlightClass] = useState("Economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState(""); // Hotel er check-out date

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (active === "Hotels") {
      if (from) params.set("city", from);
      if (date) params.set("checkin", date);
      if (checkoutDate) params.set("checkout", checkoutDate);
      params.set("guests", travellers.toString());
      params.set("rooms", rooms.toString());
      router.push(`/hotels?${params.toString()}`);
    } else if (active === "Bus") {
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (date) params.set("date", date);
      router.push(`/buses?${params.toString()}`);
    } else if (active === "Flights") {
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (date) params.set("date", date);
      params.set("adults", travellers.toString());
      params.set("class", flightClass.toLowerCase());
      router.push(`/flights?${params.toString()}`);
    }
  };

  const inputStyle = `h-[48px] w-full rounded-2xl border border-white/20 bg-white/80 px-4 text-sm font-medium text-black shadow-lg backdrop-blur-md outline-none transition-all duration-300 placeholder:text-gray-500 hover:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40`;
  const labelStyle = `mb-2 block pl-1 text-sm font-medium text-white/80`;
  const buttonStyle = `h-[48px] rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98] w-full`;

  return (
    <div className="mx-auto mt-6 max-w-5xl rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
      
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { 
              setActive(tab); 
              setFrom(""); 
              setTo(""); 
              setDate(""); 
              setCheckoutDate("");
            }}
            className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${active === tab ? "text-black" : "text-white/70 hover:text-white"}`}
          >
            {active === tab && (
              <motion.div layoutId="active-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6">
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          
          {/* Destination/From Field */}
          <div className={active === "Hotels" ? "lg:col-span-2" : ""}>
            <label className={labelStyle}>
              {active === "Hotels" ? "Enter City / Hotel Name" : "From"}
            </label>
            <input 
              value={from} 
              onChange={(e) => setFrom(e.target.value)} 
              placeholder={active === "Hotels" ? "e.g. Digha, Darjeeling" : "Departure City"} 
              className={inputStyle} 
            />
          </div>

          {/* To Field (Hidden for Hotels) */}
          {active !== "Hotels" && (
            <div>
              <label className={labelStyle}>To</label>
              <input 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                placeholder="Destination City" 
                className={inputStyle} 
              />
            </div>
          )}

          {/* Date / Check-In Date */}
          <div>
            <label className={labelStyle}>
              {active === "Hotels" ? "Check-In" : "Travel Date"}
            </label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className={inputStyle} 
            />
          </div>

          {/* Check-Out Date (Only for Hotels) */}
          {active === "Hotels" && (
            <div>
              <label className={labelStyle}>Check-Out</label>
              <input 
                type="date" 
                value={checkoutDate} 
                onChange={(e) => setCheckoutDate(e.target.value)} 
                className={inputStyle} 
              />
            </div>
          )}

          {/* Guests / Travellers */}
          <div>
            <label className={labelStyle}>
              {active === "Hotels" ? "Guests" : "Travellers"}
            </label>
            <div className="relative">
              <select 
                value={travellers} 
                onChange={(e) => setTravellers(Number(e.target.value))} 
                className={`${inputStyle} appearance-none pr-10`}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {active === "Hotels" ? "Guest" : "Traveller"}{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Flight Class (Only for Flights) */}
          {active === "Flights" && (
            <div>
              <label className={labelStyle}>Cabin Class</label>
              <div className="relative">
                <select 
                  value={flightClass} 
                  onChange={(e) => setFlightClass(e.target.value)} 
                  className={`${inputStyle} appearance-none pr-10`}
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          )}

          {/* Rooms Selection (Only for Hotels) */}
          {active === "Hotels" && (
            <div>
              <label className={labelStyle}>Rooms</label>
              <div className="relative">
                <select 
                  value={rooms} 
                  onChange={(e) => setRooms(Number(e.target.value))} 
                  className={`${inputStyle} appearance-none pr-10`}
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>{num} Room{num > 1 ? "s" : ""}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex flex-col justify-end">
            <button onClick={handleSearch} className={buttonStyle}>
              Search {active === "Hotels" ? "Hotels" : active}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}