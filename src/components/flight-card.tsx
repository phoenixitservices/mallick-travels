"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // Import Link

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    stops: string;
    price: number;
  };
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg"
    >
      <div className="grid gap-8 p-8 lg:grid-cols-4 lg:items-center">
        {/* Airline Info */}
        <div>
          <p className="text-sm text-gray-500">Airline</p>
          <h3 className="mt-2 text-2xl font-bold">{flight.airline}</h3>
          <p className="mt-2 text-sm text-gray-400">Economy Class</p>
        </div>

        {/* Route Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{flight.departure}</h2>
              <p className="mt-2 text-gray-500">{flight.from}</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm text-gray-500">{flight.duration}</p>
              <div className="relative mt-2 w-40">
                <div className="h-[2px] bg-gray-300" />
                <div className="absolute -right-1 -top-[5px] h-3 w-3 rounded-full bg-blue-600" />
              </div>
              <p className="mt-2 text-sm font-medium text-blue-600">{flight.stops}</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">{flight.arrival}</h2>
              <p className="mt-2 text-gray-500">{flight.to}</p>
            </div>
          </div>
        </div>

        {/* Pricing & Checkout Button */}
        <div className="text-center lg:text-right">
          <p className="text-sm text-gray-500">Starting From</p>
          <h2 className="mt-2 text-5xl font-bold text-blue-600">₹{flight.price}</h2>
          
          {/* LINK TO CHECKOUT WITH PARAMETERS */}
          <Link 
            href={`/checkout?type=flight&title=${flight.airline}&subtitle=${flight.from} to ${flight.to}&price=${flight.price}`}
          >
            <button className="mt-5 rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-blue-600">
              Select Flight
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}