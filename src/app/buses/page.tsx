import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BusSearch from "@/components/bus-search";
import BusFilters from "@/components/bus-filters";
import BusCard from "@/components/bus-card";

const buses = [
  {
    id: "1",
    operator: "Greenline Premium",
    type: "Volvo AC Seater (2+2)",
    from: "Kolkata",
    to: "Siliguri",
    departure: "19:30",
    arrival: "08:00",
    duration: "12h 30m",
    price: 1200,
    seatsAvailable: 15,
  },
  {
    id: "2",
    operator: "Royal Cruiser",
    type: "Scania AC Multi Axle Sleeper (2+1)",
    from: "Kolkata",
    to: "Siliguri",
    departure: "20:00",
    arrival: "07:30",
    duration: "11h 30m",
    price: 1650,
    seatsAvailable: 4,
  },
  {
    id: "3",
    operator: "SBSTC (Govt)",
    type: "Non-AC Seater (2+3)",
    from: "Kolkata",
    to: "Digha",
    departure: "06:00",
    arrival: "11:00",
    duration: "05h 00m",
    price: 250,
    seatsAvailable: 32,
  }
];

export default function BusesPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero / Search Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Book Bus Tickets
          </h1>
          {/* Vercel Error ফিক্স করার জন্য Suspense যোগ করা হলো */}
          <Suspense fallback={<div className="text-white text-center py-4">Loading search...</div>}>
            <BusSearch />
          </Suspense>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters (Left Side) */}
          <div className="lg:col-span-1 hidden lg:block">
            <Suspense fallback={<div className="py-4 text-center">Loading filters...</div>}>
              <BusFilters />
            </Suspense>
          </div>

          {/* Bus Results (Right Side) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm mb-6 flex justify-between items-center">
              <h2 className="font-bold text-lg text-gray-800">
                Found {buses.length} Buses
              </h2>
              <select className="bg-gray-50 border rounded-lg px-3 py-2 text-sm outline-none">
                <option>Sort by: Cheapest</option>
                <option>Sort by: Fastest</option>
                <option>Sort by: Earliest</option>
              </select>
            </div>

            {/* Render Cards */}
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}