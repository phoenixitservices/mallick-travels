"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookingTabs from "@/components/booking-tabs";
import { motion } from "framer-motion";
import { Compass, ShieldCheck, Star, MapPin, Heart, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context"; // Auth context import kora holo

export default function HomePage() {
  const { user } = useAuth(); // User state niye asha holo

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-500/30">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-900/90" />
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-2xl mb-6"
          >
            Discover The World In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Absolute Luxury</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium"
          >
            Curated premium flight cabins, handpicked 5-star resorts, and bespoke holiday packages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <BookingTabs />
          </motion.div>
        </div>
      </section>

      {/* 2. TRENDING DESTINATIONS */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp} className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Trending Destinations</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Explore the most sought-after locations curated just for you.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Santorini, Greece", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop", price: "45,000" },
              { title: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", price: "32,000" },
              { title: "Swiss Alps", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop", price: "85,000" },
            ].map((dest, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group relative rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 cursor-pointer">
                <div className="h-80 w-full overflow-hidden">
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2"><MapPin size={20} className="text-cyan-400" /> {dest.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-gray-300 text-sm">Starting from <span className="font-bold text-white text-lg">₹{dest.price}</span></p>
                    <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 transition">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PARALLAX LUXURY PACKAGES */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Exclusive Holiday Packages</h2>
            <p className="text-gray-300 max-w-xl mx-auto">Immersive experiences blended with top-tier luxury accommodations.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Maldives Escape", duration: "4N/5D", tag: "Honeymoon" },
              { title: "Dubai Luxury", duration: "5N/6D", tag: "Adventure" },
              { title: "Kashmir Valley", duration: "6N/7D", tag: "Nature" },
              { title: "Goa Beach Resort", duration: "3N/4D", tag: "Relaxation" },
            ].map((pkg, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer group">
                <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
                  {pkg.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-300 mb-6 flex items-center gap-2"><Clock size={14} /> {pkg.duration}</p>
                <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                  <span className="text-sm text-white font-medium group-hover:text-blue-300 transition">View Details</span>
                  <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-black py-24 text-white border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Why Choose TravelPro</h2>
            <p className="text-gray-400 max-w-xl mx-auto">We don't just book tickets; we craft unforgettable memories.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition text-center group">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Secure & Trusted</h3>
              <p className="text-sm text-gray-400">IATA certified agency with end-to-end encrypted payment gateways (Razorpay).</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition text-center group">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Experiences</h3>
              <p className="text-sm text-gray-400">Exclusive tie-ups with 5-star hotels and luxury airlines for VIP treatments.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition text-center group">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Concierge</h3>
              <p className="text-sm text-gray-400">Dedicated support executives available round the clock during your trip.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (UPDATED WITH AUTH STATE) */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 relative z-10 text-center">
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            {user ? "Welcome Back to Your Adventure!" : "Ready for your next adventure?"}
          </h2>
          
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            {user 
              ? "Continue exploring our exclusive premium travel packages tailored just for you." 
              : "Join TravelPro today and unlock secret deals up to 40% off on luxury stays."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              // User login thakle Dashboard button dekhabe
              <Link href="/dashboard">
                <button className="h-14 px-8 rounded-xl bg-white text-blue-600 font-bold text-lg shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              // User login na thakle Signup button dekhabe
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl bg-white text-blue-600 font-bold text-lg shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
                  Create Free Account
                </button>
              </Link>
            )}

            <Link href="/packages">
              <button className="h-14 px-8 rounded-xl bg-blue-700/50 border border-blue-400/50 text-white font-bold text-lg backdrop-blur-md hover:bg-blue-700 transition w-full sm:w-auto">
                Explore Packages
              </button>
            </Link>
          </div>

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}