import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FlightCard from "@/components/flight-card";
import FlightSearch from "@/components/flight-search";
import FlightFilters from "@/components/flight-filters";
import { supabase } from "@/lib/supabase";

async function getFlights(searchParams: any) {
  let query = supabase
    .from("flights")
    .select(`
      *,
      airlines (name, logo_url),
      from_airport:airports!flights_from_airport_id_fkey (city, code, name),
      to_airport:airports!flights_to_airport_id_fkey (city, code, name)
    `);

  if (searchParams.from) {
    query = query.eq("from_airport_id", searchParams.from);
  }

  if (searchParams.to) {
    query = query.eq("to_airport_id", searchParams.to);
  }

  if (searchParams.stops) {
    query = query.eq("stops", Number(searchParams.stops));
  }

  if (searchParams.maxPrice) {
    query = query.lte("price", Number(searchParams.maxPrice));
  }

  return (await query.order("departure_time")).data || [];
}

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const flights = await getFlights(searchParams);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      {/* Flight Hero Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
            alt="Flights Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay (যাতে টেক্সট পরিষ্কার বোঝা যায়) */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Book Your Dream Flight
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Find the best deals on flights to your favorite destinations worldwide.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">

          {/* FILTERS SIDEBAR */}
          <div className="lg:col-span-1">
            <FlightFilters />
          </div>

          {/* FLIGHT RESULTS */}
          <div className="space-y-6 lg:col-span-3">
            {flights.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-gray-500">No flights found for your search criteria.</p>
              </div>
            ) : (
              flights.map((flight: any) => (
                <FlightCard
                  key={flight.id}
                  flight={{
                    id: flight.id,
                    airline: flight.airlines?.name,
                    from: `${flight.from_airport?.city} (${flight.from_airport?.code})`,
                    to: `${flight.to_airport?.city} (${flight.to_airport?.code})`,
                    departure: new Date(
                      flight.departure_time
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    arrival: new Date(
                      flight.arrival_time
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    duration: flight.duration,
                    stops:
                      flight.stops === 0
                        ? "Non-stop"
                        : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`,
                    price: flight.price,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}