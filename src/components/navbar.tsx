"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { Compass, Menu, X, User, ChevronDown, Plane, Building, Briefcase, Bus, Train, Info, PhoneCall } from "lucide-react";

// --- Ultra-Smooth Magnetic Button Wrapper (Only for specific buttons now, not the logo) ---
function MagneticItem({ children, className, strength = 0.2 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);

  const { scrollY } = useScroll();

  // Smart Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setIsHidden(true);
      setMobileMenuOpen(false);
      setIsBookingDropdownOpen(false);
    } else {
      setIsHidden(false);
    }
  });

  // Premium Dropdown Items
  const bookingServices = [
    { name: "Flights", path: "/flights", icon: Plane, desc: "Premium worldwide cabins" },
    { name: "Hotels", path: "/hotels", icon: Building, desc: "Exclusive 5-star stays" },
    { name: "Packages", path: "/packages", icon: Briefcase, desc: "Curated holiday trips" },
    { name: "Buses", path: "/buses", icon: Bus, desc: "Comfortable road journeys" },
    { name: "Trains", path: "/trains", icon: Train, desc: "Scenic railway routes" },
  ];

  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none ${
          isScrolled ? "pt-4 px-4" : "pt-0 px-0"
        }`}
      >
        <header
          className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
            isScrolled
              ? "w-full max-w-6xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 rounded-full py-3 px-6"
              : "w-full max-w-7xl bg-transparent py-6 px-6 md:px-12"
          }`}
        >
          {/* Logo - Stable, No Magnetic Float */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
            <div className={`p-2 rounded-xl transition-colors duration-300 ${isScrolled ? 'bg-blue-600 text-white' : 'bg-white/20 backdrop-blur-md text-white'}`}>
              <Compass size={22} strokeWidth={2.5} />
            </div>
            <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-white"}`}>
              Mallick Travels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 relative">
            
            {/* Standard Links */}
            {mainNavLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-5 py-2 text-sm font-semibold transition-colors rounded-full"
                >
                  {hoveredItem === item.name && (
                    <motion.div layoutId="navbar-hover-pill" className={`absolute inset-0 rounded-full -z-10 ${isScrolled ? 'bg-slate-100' : 'bg-white/15'}`} transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive ? (isScrolled ? "text-blue-600" : "text-cyan-300") : (isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white")
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Premium Booking Dropdown Menu */}
            <div 
              onMouseEnter={() => { setHoveredItem("Book"); setIsBookingDropdownOpen(true); }}
              onMouseLeave={() => { setHoveredItem(null); setIsBookingDropdownOpen(false); }}
              className="relative"
            >
              <button className="relative px-5 py-2 text-sm font-semibold transition-colors rounded-full flex items-center gap-1">
                {hoveredItem === "Book" && (
                  <motion.div layoutId="navbar-hover-pill" className={`absolute inset-0 rounded-full -z-10 ${isScrolled ? 'bg-slate-100' : 'bg-white/15'}`} transition={{ type: "spring", stiffness: 300, damping: 25 }} />
                )}
                <span className={`relative z-10 flex items-center gap-1 transition-colors duration-300 ${isScrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"}`}>
                  Book <ChevronDown size={14} className={`transition-transform duration-300 ${isBookingDropdownOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              {/* Dropdown Panel */}
              <AnimatePresence>
                {isBookingDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-3xl p-3 overflow-hidden z-50"
                  >
                    <div className="flex flex-col gap-1">
                      {bookingServices.map((service) => {
                        const Icon = service.icon;
                        const isServiceActive = pathname === service.path;
                        return (
                          <Link 
                            key={service.name} 
                            href={service.path}
                            className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-slate-50 group ${isServiceActive ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className={`p-2 rounded-full transition-colors ${isServiceActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                              <Icon size={18} />
                            </div>
                            <div>
                              <p className={`text-sm font-bold ${isServiceActive ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{service.name}</p>
                              <p className="text-xs text-slate-500">{service.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA / User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticItem strength={0.15}>
              {user ? (
                <Link href="/dashboard" className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-sm font-bold shadow-sm ${
                  isScrolled 
                    ? "bg-slate-900 text-white hover:bg-slate-800" 
                    : "bg-white text-slate-900 hover:bg-slate-100"
                }`}>
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link href="/login" className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${
                  isScrolled 
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 hover:-translate-y-0.5" 
                    : "bg-white text-blue-600 hover:bg-slate-50 hover:-translate-y-0.5"
                }`}>
                  Sign In
                </Link>
              )}
            </MagneticItem>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-slate-900 bg-slate-100" : "text-white bg-white/10 backdrop-blur-md"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-white/95 backdrop-blur-2xl shadow-2xl border border-slate-200/50 rounded-3xl p-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh]"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              {[...mainNavLinks].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <hr className="border-slate-100 my-2" />

            {/* Mobile Booking Services */}
            <div>
              <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bookings</p>
              <div className="grid grid-cols-1 gap-1">
                {bookingServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link 
                      key={service.name} 
                      href={service.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-blue-600">{service.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              {user ? (
                <Link 
                  href="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-md"
                >
                  <User size={18} /> Dashboard
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
