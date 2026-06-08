"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Train, Clock } from "lucide-react";

interface TrainCardProps {
  train: {
    id: string;
    name: string;
    number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    classes: { type: string; price: number; status: string }[];
  };
}

export default function TrainCard({ train }: TrainCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-200/40 transition-all mb-4"
    >
      <div className="p-6">
        
        {/* Top Header: Train Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100 text-blue-600">
              <Train size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                {train.name} <span className="text-sm font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{train.number}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1">
                Runs On: <span className="text-green-600 font-bold">M T W T F S S</span>
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Route & Timing */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black text-gray-900">{train.departure}</h2>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">{train.from}</p>
          </div>
          
          <div className="flex-1 px-4 sm:px-8 text-center flex flex-col items-center">
            <p className="text-xs font-bold text-gray-400 flex items-center gap-1 mb-1"><Clock size={12}/> {train.duration}</p>
            <div className="relative w-full h-[2px] bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
          </div>
          
          <div className="text-center sm:text-right">
            <h2 className="text-2xl font-black text-gray-900">{train.arrival}</h2>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">{train.to}</p>
          </div>
        </div>

        {/* Bottom: Classes & Pricing (Horizontal Scroll) */}
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {train.classes.map((cls, idx) => (
            <div key={idx} className="min-w-[140px] border border-gray-200 rounded-2xl p-3 bg-white hover:border-blue-400 transition-colors group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-black text-gray-800">{cls.type}</span>
                <span className="text-sm font-black text-blue-600">₹{cls.price}</span>
              </div>
              <p className={`text-xs font-bold mb-3 ${cls.status.includes('WL') || cls.status.includes('RAC') ? 'text-orange-500' : 'text-green-600'}`}>
                {cls.status}
              </p>
              
              {/* Checkout Link Generator */}
              <Link href={`/checkout?type=train&title=${encodeURIComponent(`${train.name} (${train.number})`)}&subtitle=${encodeURIComponent(`${train.from} to ${train.to} - Class: ${cls.type}`)}&price=${cls.price}`}>
                <button className="w-full py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}