import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TrainSearch from "@/components/train-search";
import TrainFilters from "@/components/train-filters";
import TrainCard from "@/components/train-card";

export const dynamic = "force-dynamic";

// Mock Data for Trains
const mockTrains = [
  {
    id: "TR-101",
    name: "Howrah Rajdhani Exp",
    number: "12301",
    from: "Howrah (HWH)",
    to: "New Delhi (NDLS)",
    departure: "16:50",
    arrival: "10:05",
    duration: "17h 15m",
    classes: [
      { type: "3A", price: 2150, status: "AVAILABLE-042" },
      { type: "2A", price: 3050, status: "AVAILABLE-012" },
      { type: "1A", price: 5120, status: "WL-4" },
    ]
  },
  {
    id: "TR-102",
    name: "Vande Bharat Express",
    number: "22301",
    from: "Howrah (HWH)",
    to: "NJP",
    departure: "05:55",
    arrival: "13:25",
    duration: "07h 30m",
    classes: [
      { type: "CC", price: 1565, status: "AVAILABLE-120" },
      { type: "EC", price: 2825, status: "RAC-12" },
    ]
  },
  {
    id: "TR-103",
    name: "Coromandel Express",
    number: "12841",
    from: "Shalimar (SHM)",
    to: "Chennai (MAS)",
    departure: "15:20",
    arrival: "16:50",
    duration: "25h 30m",
    classes: [
      { type: "SL", price: 650, status: "WL-89" },
      { type: "3A", price: 1720, status: "RAC-45" },
      { type: "2A", price: 2450, status: "AVAILABLE-08" },
    ]
  }
];

export default function TrainsPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/30">
      <Navbar />

      {/* Hero / Search Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541427468627-a47a58ea359f?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-3 drop-shadow-lg">
            Book Train Tickets
          </h1>
          <p className="text-center text-blue-100 mb-8 font-medium">Fast, secure and official IRCTC partner portal.</p>
          
          {/* Suspense দিয়ে TrainSearch র‍্যাপ করা হলো */}
          <Suspense fallback={<div className="text-white text-center py-4">Loading search...</div>}>
            <TrainSearch />
          </Suspense>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters (Left Side) */}
          <div className="lg:col-span-1 hidden lg:block">
            <Suspense fallback={<div className="py-4 text-center">Loading filters...</div>}>
              <TrainFilters />
            </Suspense>
          </div>

          {/* Train Results (Right Side) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-900">
                Found {mockTrains.length} Trains
              </h2>
              <select className="bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition">
                <option>Sort by: Departure Time</option>
                <option>Sort by: Arrival Time</option>
                <option>Sort by: Duration</option>
              </select>
            </div>

            {/* Render Cards */}
            <div className="space-y-4">
              {mockTrains.map((train) => (
                <TrainCard key={train.id} train={train} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}