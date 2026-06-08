"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    slug: string;
    city: string;
    country: string;
    thumbnail_url: string;
    rating: number;
  };
}

export default function HotelCard({
  hotel,
}: HotelCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-xl"
    >

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={hotel.thumbnail_url}
          alt={hotel.name}
          className="h-72 w-full object-cover transition duration-500 hover:scale-110"
        />

        <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 font-semibold shadow-lg">
          ⭐ {hotel.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          {hotel.city}, {hotel.country}
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {hotel.name}
        </h2>

        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              ₹18,999
            </h3>
          </div>

          <Link
            href={`/hotels/${hotel.slug}`}
            className="rounded-2xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            View Hotel
          </Link>
        </div>
      </div>
    </motion.div>
  );
}