import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HotelCard from "@/components/hotel-card";
import { supabase } from "@/lib/supabase";

async function getHotels() {

  const { data } = await supabase
    .from("hotels")
    .select("*")
    .order("rating", {
      ascending: false,
    });

  return data || [];
}

export default async function HotelsPage() {

  const hotels = await getHotels();

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />
      
      {/* Hotel Hero Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000"
            alt="Hotels Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Find the Perfect Hotel
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Stay in luxury and comfort anywhere in the world at the best prices.
          </p>
        </div>
      </div>

      {/* Hotels */}
      <section className="container mx-auto px-4 py-20">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {hotels.map((hotel: any) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}