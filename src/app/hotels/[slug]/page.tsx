import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

async function getHotel(slug: string) {

    const { data: hotel } = await supabase
        .from("hotels")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!hotel) return null;

    const { data: rooms } = await supabase
        .from("hotel_rooms")
        .select("*")
        .eq("hotel_id", hotel.id);

    return {
        hotel,
        rooms,
    };
}

export default async function HotelDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {

    const { slug } = await params;

    const data = await getHotel(slug);

    if (!data) {
        notFound();
    }

    return (
        <main className="bg-gray-50">

            <Navbar />

            {/* Hero */}
            <section className="relative h-[70vh] overflow-hidden">

                <img
                    src={data.hotel.thumbnail_url}
                    alt={data.hotel.name}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex items-center justify-center">

                    <div className="text-center text-white">

                        <p className="uppercase tracking-[0.3em]">
                            {data.hotel.city}, {data.hotel.country}
                        </p>

                        <h1 className="mt-6 text-6xl font-bold">
                            {data.hotel.name}
                        </h1>

                        <div className="mt-6 inline-flex rounded-full bg-white/20 px-6 py-3 backdrop-blur-lg">
                            ⭐ {data.hotel.rating} Rating
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4 py-20">

                <div className="grid gap-12 lg:grid-cols-3">

                    {/* Left */}
                    <div className="space-y-10 lg:col-span-2">

                        {/* About */}
                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-6 text-4xl font-bold">
                                About Hotel
                            </h2>

                            <p className="text-lg leading-relaxed text-gray-600">
                                {data.hotel.description}
                            </p>
                        </div>

                        {/* Rooms */}
                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-8 text-4xl font-bold">
                                Available Rooms
                            </h2>

                            <div className="space-y-8">

                                {data?.rooms?.map((room: any) => (

                                    <div
                                        key={room.id}
                                        className="overflow-hidden rounded-3xl border"
                                    >

                                        <img
                                            src={room.room_image}
                                            alt={room.room_type}
                                            className="h-64 w-full object-cover"
                                        />

                                        <div className="p-6">

                                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                                <div>

                                                    <h3 className="text-3xl font-bold">
                                                        {room.room_type}
                                                    </h3>

                                                    <div className="mt-4 flex flex-wrap gap-3">

                                                        {room.amenities?.map(
                                                            (amenity: string) => (
                                                                <span
                                                                    key={amenity}
                                                                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600"
                                                                >
                                                                    {amenity}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-right">

                                                    <h4 className="text-4xl font-bold text-blue-600">
                                                        ₹{room.price_per_night}
                                                    </h4>

                                                    <p className="mt-2 text-gray-500">
                                                        Per Night
                                                    </p>

                                                    <a
                                                        href={`/checkout?hotel=${data.hotel.name}&room=${room.room_type}&price=${room.price_per_night}`}
                                                        className="mt-5 inline-block rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                                                    >
                                                        Book Room
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div>

                        <div className="sticky top-24 rounded-3xl bg-black p-8 text-white shadow-2xl">

                            <p className="text-lg text-gray-400">
                                Starting From
                            </p>

                            <h2 className="mt-4 text-5xl font-bold">
                                ₹18,999
                            </h2>

                            <p className="mt-3 text-gray-400">
                                Per Night
                            </p>

                            <button className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:bg-blue-600 hover:text-white">
                                Reserve Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}