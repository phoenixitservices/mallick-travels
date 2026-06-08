import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PackageCard from "@/components/package-card";
import { supabase } from "@/lib/supabase";

async function getPackages() {
  const { data } = await supabase
    .from("packages")
    .select("*");

  return data || [];
}

export default async function PackagesPage() {

  const packages = await getPackages();

  return (
    <main className="bg-gray-50">

      <Navbar />

      {/* Hero */}

      {/* Packages Hero Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000"
            alt="Packages Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Exclusive Holiday Packages
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Curated travel experiences designed for your perfect getaway. Just pack your bags!
          </p>
        </div>
      </div>

      {/* Packages */}
      <section className="container mx-auto px-4 py-20">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}