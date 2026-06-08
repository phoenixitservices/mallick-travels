import BookingTabs from "./booking-tabs";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">

        <p className="mb-6 text-lg uppercase tracking-[0.4em]">
          Explore The World
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Book Flights, Hotels, Trains & Luxury Tours
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-200">
          Discover seamless travel experiences with premium bookings and unforgettable destinations.
        </p>

        <BookingTabs />
      </div>
    </section>
  );
}