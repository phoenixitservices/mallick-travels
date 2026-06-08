import Navbar from "@/components/navbar";
import InquiryForm from "@/components/inquiry-form";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

async function getPackage(slug: string) {
  const { data } = await supabase
    .from("packages")
    .select(`
      *,
      destinations(name, country),
      itineraries(*)
    `)
    .eq("slug", slug)
    .single();

  return data;
}

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pkg = await getPackage(slug);

  if (!pkg) {
    return notFound();
  }

  return (
    <main className="bg-gray-50">

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">

        <img
          src={pkg.featured_image}
          alt={pkg.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">

            <p className="mb-4 text-lg uppercase tracking-[0.3em]">
              {pkg.destinations?.country}
            </p>

            <h1 className="text-6xl font-bold">
              {pkg.title}
            </h1>

            <p className="mt-6 text-xl">
              {pkg.duration_days} Days /{" "}
              {pkg.duration_nights} Nights
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-20">

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-12 lg:col-span-2">

            {/* Overview */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-4xl font-bold">
                Tour Overview
              </h2>

              <p className="text-lg leading-relaxed text-gray-600">
                Experience unforgettable moments with our premium travel package designed for comfort, adventure, and luxury.
              </p>
            </div>

            {/* Inclusions */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold">
                Inclusions
              </h2>

              <ul className="space-y-3">
                {pkg.inclusions?.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      className="rounded-xl bg-green-50 p-4"
                    >
                      ✓ {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-bold">
                Exclusions
              </h2>

              <ul className="space-y-3">
                {pkg.exclusions?.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      className="rounded-xl bg-red-50 p-4"
                    >
                      ✕ {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-8 text-3xl font-bold">
                Travel Itinerary
              </h2>

              <div className="space-y-6">
                {pkg.itineraries?.map((day: any) => (
                  <div
                    key={day.id}
                    className="rounded-2xl border p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                        {day.day_number}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold">
                          {day.title}
                        </h3>

                        <p className="mt-2 text-gray-600">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>

            <div className="sticky top-24 space-y-8">

              {/* Price Card */}
              <div className="rounded-3xl bg-black p-8 text-white shadow-xl">

                <p className="text-lg text-gray-300">
                  Starting From
                </p>

                <h2 className="mt-2 text-5xl font-bold">
                  ₹{pkg.base_price}
                </h2>

                <p className="mt-4 text-gray-400">
                  Per Person
                </p>
              </div>

              {/* Inquiry Form */}
              <InquiryForm packageId={pkg.id} />

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}