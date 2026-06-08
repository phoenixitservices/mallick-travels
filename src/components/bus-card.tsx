"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BusCardProps {
  bus: {
    id: string;
    operator: string;
    type: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    seatsAvailable: number;
  };
}

export default function BusCard({ bus }: BusCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all"
    >
      <div className="grid gap-6 p-6 lg:grid-cols-4 lg:items-center">
        
        {/* Operator Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900">{bus.operator}</h3>
          <p className="mt-1 text-sm text-gray-500">{bus.type}</p>
        </div>

        {/* Timing Info */}
        <div className="lg:col-span-2 flex items-center justify-between">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{bus.departure}</h2>
            <p className="text-sm text-gray-500">{bus.from}</p>
          </div>
          <div className="px-4 text-center">
            <p className="text-xs font-semibold text-gray-400">{bus.duration}</p>
            <div className="relative mt-1 w-32 flex items-center">
              <div className="h-[2px] w-full bg-gray-200" />
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{bus.arrival}</h2>
            <p className="text-sm text-gray-500">{bus.to}</p>
          </div>
        </div>

        {/* Price & Action */}
        <div className="text-center lg:text-right border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 border-gray-100">
          <p className="text-xs text-green-600 font-bold mb-1">{bus.seatsAvailable} Seats Left</p>
          <h2 className="text-3xl font-bold text-gray-900">₹{bus.price}</h2>
          
          <Link 
            href={`/checkout?type=bus&title=${encodeURIComponent(bus.operator)}&subtitle=${encodeURIComponent(`${bus.from} to ${bus.to} (${bus.type})`)}&price=${bus.price}`}
          >
            <button className="mt-3 w-full rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 shadow-md hover:shadow-red-500/30">
              SELECT SEATS
            </button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}