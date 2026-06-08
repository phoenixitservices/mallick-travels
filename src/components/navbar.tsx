"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Plane,
  User,
  LogOut,
  LayoutDashboard,
  Sparkles,
  ChevronDown, // Dropdown indicator-এর জন্য যোগ করা হলো
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";

// সাধারণ পেজগুলোর লিংক
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// ড্রপডাউন-এর ভেতরের বুকিং সার্ভিসগুলো
const bookingServices = [
  { name: "Flights Booking", href: "/flights" },
  { name: "Hotels Booking", href: "/hotels" },
  { name: "Buses Booking", href: "/buses" },
  { name: "Trains Booking", href: "/trains" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  // ড্রপডাউনের কোনো একটা অপশন অ্যাক্টিভ কি না তা চেক করার জন্য
  const isBookingActive = bookingServices.some((service) => pathname === service.href);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-2xl">
      {/* Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 shadow-xl transition duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <Plane className="relative z-10 h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">Mallick Travels</h1>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Luxury Travel</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl lg:flex">
          {/* Home Link */}
          <Link
            href="/"
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              pathname === "/" ? "bg-white text-black shadow-lg" : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {pathname === "/" && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl" />}
            <span className="relative z-10">Home</span>
          </Link>

          {/* Bookings Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`relative flex items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 outline-none ${
                  isBookingActive ? "bg-white text-black shadow-lg" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isBookingActive && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl" />}
                <span className="relative z-10 flex items-center gap-1">
                  Bookings <ChevronDown className="h-4 w-4 opacity-70" />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl border border-white/10 bg-black/95 p-2 text-white backdrop-blur-2xl">
              {bookingServices.map((service) => (
                <DropdownMenuItem key={service.name} asChild>
                  <Link
                    href={service.href}
                    className={`flex cursor-pointer items-center rounded-xl px-4 py-3 transition ${
                      pathname === service.href ? "bg-white/20 text-white font-semibold" : "hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Remaining Core Links */}
          {navLinks.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  active ? "bg-white text-black shadow-lg" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl" />}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Auth Profile */}
        <div className="hidden items-center gap-4 lg:flex">
          {!user ? (
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-300 transition hover:text-white">
                Login
              </Link>
              <Link href="/signup">
                <Button className="group relative overflow-hidden rounded-full bg-blue-600 px-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">Sign Up</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Dashboard
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <User className="relative z-10 h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl border border-white/10 bg-black/95 p-2 text-white backdrop-blur-2xl">
                  <div className="mb-2 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Logged In</p>
                    <p className="mt-2 truncate font-medium text-white">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex cursor-pointer items-center rounded-xl px-3 py-3 transition hover:bg-white/10">
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="mt-1 flex cursor-pointer items-center rounded-xl px-3 py-3 text-red-400 transition hover:bg-red-500/10">
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-white/10 bg-black/95 text-white backdrop-blur-2xl overflow-y-auto">
              <div className="mt-10 flex flex-col">
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                    <Plane className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Mallick Travels</h2>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Luxury Travel</p>
                  </div>
                </div>

                {/* Mobile Links Container */}
                <div className="flex flex-col gap-2">
                  <Link href="/" className={`rounded-2xl px-5 py-3 text-lg font-medium ${pathname === "/" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"}`}>
                    Home
                  </Link>

                  {/* Mobile Menu-তে ড্রপডাউন করার দরকার নেই, সেখানে আলাদা ক্যাটাগরি হিসেবে দেখালে স্ক্রোল করতে সুবিধা হয় */}
                  <div className="my-2 border-t border-white/10 pt-2">
                    <p className="px-5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Bookings</p>
                    {bookingServices.map((service) => (
                      <Link key={service.name} href={service.href} className={`rounded-2xl px-5 py-3 text-base font-medium flex ${pathname === service.href ? "bg-blue-600/30 text-white border border-blue-500/40" : "text-gray-400 hover:bg-white/5"}`}>
                        {service.name.replace(" Booking", "")}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-2 flex flex-col gap-2">
                    {navLinks.slice(1).map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link key={link.name} href={link.href} className={`rounded-2xl px-5 py-3 text-lg font-medium ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"}`}>
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Auth Actions for Mobile */}
                <div className="mt-10 flex flex-col gap-4">
                  {!user ? (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full rounded-2xl border-white/20 bg-transparent py-6 text-white hover:bg-white hover:text-black">Login</Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full rounded-2xl bg-blue-600 py-6 text-white hover:bg-blue-700">Create Account</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard">
                        <Button className="w-full rounded-2xl bg-blue-600 py-6 hover:bg-blue-700">Dashboard</Button>
                      </Link>
                      <Button onClick={handleLogout} variant="destructive" className="w-full rounded-2xl py-6">Logout</Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}