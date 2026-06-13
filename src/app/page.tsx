"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookingTabs from "@/components/booking-tabs";
import { motion, Variants } from "framer-motion";
import { Compass, ShieldCheck, Star, MapPin, Heart, ArrowRight, Clock, Mail } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function HomePage() {
  const { user } = useAuth();
  
  // --- Mouse Cursor Movement (Parallax State) ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX - window.innerWidth / 2) / 40; 
    const y = (e.clientY - window.innerHeight / 2) / 40;
    setMousePos({ x, y });
  };

  // Storytelling scroll animations
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const storyVariant: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-500/30 overflow-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative h-screen flex items-center justify-center pt-20 overflow-hidden perspective-1000"
      >
        <motion.div 
          animate={{ x: mousePos.x * -1, y: mousePos.y * -1, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 75, damping: 20 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-900/90" />
        
        <motion.div 
          animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
          transition={{ type: "spring", stiffness: 75, damping: 20 }}
          className="container relative z-10 mx-auto px-4 text-center mt-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl mb-6 flex flex-col md:block"
          >
            Discover The World In {" "}
            <motion.span 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest uppercase mt-2 md:mt-0"
            >
              Absolute Luxury
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium"
          >
            Curated premium flight cabins, handpicked 5-star resorts, and bespoke holiday packages.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <BookingTabs />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. TRENDING DESTINATIONS */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={storyVariant} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Trending Destinations</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Explore the most sought-after locations curated just for you.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Santorini, Greece", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop", price: "45,000" },
              { title: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", price: "32,000" },
              { title: "Swiss Alps", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop", price: "85,000" },
            ].map((dest, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group relative rounded-3xl overflow-hidden shadow-xl shadow-blue-900/5 cursor-pointer">
                <div className="h-80 w-full overflow-hidden">
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
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
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={storyVariant} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Exclusive Holiday Packages</h2>
            <p className="text-gray-300 max-w-xl mx-auto">Immersive experiences blended with top-tier luxury accommodations.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Maldives Escape", duration: "4N/5D", tag: "Honeymoon" },
              { title: "Dubai Luxury", duration: "5N/6D", tag: "Adventure" },
              { title: "Kashmir Valley", duration: "6N/7D", tag: "Nature" },
              { title: "Goa Beach Resort", duration: "3N/4D", tag: "Relaxation" },
            ].map((pkg, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:bg-blue-600/20 transition-all cursor-pointer group">
                <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
                  {pkg.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-300 mb-6 flex items-center gap-2"><Clock size={14} /> {pkg.duration}</p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-sm text-white font-medium group-hover:text-cyan-300 transition">View Details</span>
                  <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-slate-50 py-24 text-slate-800 border-t border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={storyVariant} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Why Choose Mallick Travels</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We don't just book tickets; we craft unforgettable memories.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-blue-500/10 transition-all text-center group">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="h-16 w-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">100% Secure & Trusted</h3>
              <p className="text-sm text-slate-500">IATA certified agency with end-to-end encrypted payment gateways (Razorpay).</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-amber-500/10 transition-all text-center group">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="h-16 w-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-amber-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Premium Experiences</h3>
              <p className="text-sm text-slate-500">Exclusive tie-ups with 5-star hotels and luxury airlines for VIP treatments.</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-emerald-500/10 transition-all text-center group">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-emerald-500" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">24/7 Concierge</h3>
              <p className="text-sm text-slate-500">Dedicated support executives available round clock during your trip.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. DYNAMIC CALL TO ACTION */}
      {!user ? (
        // For Logged Out Users: Standard Sign Up CTA
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/40" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10" />
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp} className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready for your next adventure?</h2>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto text-lg font-light">Join Mallick Travels today and unlock secret deals up to 40% off on luxury stays.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 transition-all w-full sm:w-auto">
                  Create Free Account
                </button>
              </Link>
              <Link href="/packages">
                <button className="h-14 px-8 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-lg backdrop-blur-md hover:bg-white/20 transition-all w-full sm:w-auto">
                  Explore Packages
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      ) : (
        // For Logged In Users: Premium Newsletter / Alerts Subscription
        <section className="py-20 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp} className="container mx-auto px-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14 max-w-4xl mx-auto text-center shadow-2xl">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Get VIP Travel Deals</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto text-lg">You are already part of the family. Subscribe to our newsletter to receive early access to premium package drops.</p>
              
              <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 h-14 px-6 rounded-xl bg-white text-slate-900 font-medium outline-none border-2 border-transparent focus:border-blue-300 transition-all"
                />
                <button type="submit" className="h-14 px-8 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      )}

      <Footer />
    </main>
  );
}
