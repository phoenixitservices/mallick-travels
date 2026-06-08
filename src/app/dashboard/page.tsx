"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import Link from "next/link"; // Link ইমপোর্ট করা হলো
import { 
  User, 
  Map, 
  Ticket, 
  Heart, 
  Settings, 
  LogOut, 
  PlaneTakeoff, 
  Building,
  Home // Home আইকন ইমপোর্ট করা হলো
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bookings");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading your luxury experience...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white">
              Welcome back, {user.user_metadata?.first_name || "Traveler"}!
            </h1>
            <p className="text-gray-400 mt-2">Manage your luxury stays and flight bookings here.</p>
          </div>
          
          {/* Action Buttons (Home + Logout) */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20 transition">
                <Home className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 font-semibold text-red-500 hover:bg-red-500/20 transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                    activeTab === "bookings" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Ticket className="h-5 w-5" />
                  <span className="font-semibold">My Bookings</span>
                </button>
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                    activeTab === "profile" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Profile Info</span>
                </button>
                <button 
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                    activeTab === "wishlist" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">Saved Items</span>
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                    activeTab === "settings" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-semibold">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl min-h-[500px]"
            >
              
              {/* TAB: Bookings */}
              {activeTab === "bookings" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Upcoming Trips</h2>
                  
                  <div className="flex flex-col gap-4">
                    {/* Demo Card 1 */}
                    <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                          <PlaneTakeoff className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Flight to Paris</h3>
                          <p className="text-sm text-gray-400">Air France • Oct 15, 2026</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 mb-2">
                          Confirmed
                        </span>
                        <p className="text-white font-bold">$ 850.00</p>
                      </div>
                    </div>

                    {/* Demo Card 2 */}
                    <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                          <Building className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">The Ritz-Carlton</h3>
                          <p className="text-sm text-gray-400">Maldives • Nov 02, 2026</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400 mb-2">
                          Pending Payment
                        </span>
                        <p className="text-white font-bold">$ 2,400.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Profile */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                      <p className="text-sm text-gray-400">Full Name</p>
                      <p className="text-lg font-semibold text-white">
                        {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                      <p className="text-sm text-gray-400">Email Address</p>
                      <p className="text-lg font-semibold text-white">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Wishlist */}
              {activeTab === "wishlist" && (
                <div className="flex h-full flex-col items-center justify-center text-center py-10">
                  <Heart className="h-16 w-16 text-gray-600 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">No Saved Items</h2>
                  <p className="text-gray-400 max-w-sm mb-6">
                    You haven't saved any packages or hotels yet. Start exploring and save your favorites!
                  </p>
                  <Link href="/packages">
                    <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700">
                      Explore Packages
                    </button>
                  </Link>
                </div>
              )}

              {/* TAB: Settings */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  <p className="text-gray-400">Preferences and security settings will appear here.</p>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}