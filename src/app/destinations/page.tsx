import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DestinationCard from "@/components/destination-card";
import { supabase } from "@/lib/supabase";

async function getDestinations() {

  const { data } = await supabase
    .from("destinations")
    .select("*");

  return data || [];
}

export default async function DestinationsPage() {

  const destinations = await getDestinations();

  return (
    <main className="bg-gray-50">

      <Navbar />

      {/* Hero */}
      {/* Destinations Hero Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000"
            alt="Destinations Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Explore Top Destinations
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Discover breathtaking locations and uncover hidden gems around the globe.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="container mx-auto px-4 py-20">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}