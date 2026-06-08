import Link from "next/link";
import { Globe, Send, Camera, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white italic">MALLICK TRAVELS</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We provide luxury travel experiences with 100% secure bookings and 24/7 dedicated concierge services worldwide.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition">
                <Send className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition">
                <Camera className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
              <li><Link href="/packages" className="hover:text-cyan-400 transition">Holiday Packages</Link></li>
              <li><Link href="/hotels" className="hover:text-cyan-400 transition">Luxury Hotels</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact Us</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-500" />
                <span>123 Travel Street, Kolkata, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-500" />
                <span>support@mallicktravels.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Mallick Travels. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <span>Powered by Next.js</span>
            <span>Secured by Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}