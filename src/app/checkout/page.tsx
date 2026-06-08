"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { 
  Plane, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [details, setDetails] = useState<any>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [coTravelers, setCoTravelers] = useState<string[]>([]);

  useEffect(() => {
    const bookingType = searchParams.get("type") || "booking";
    const bookingPrice = parseFloat(searchParams.get("price") || "0");
    
    setType(bookingType);
    setPrice(bookingPrice);

    if (user?.email) {
      setEmail(user.email);
    }

    if (bookingType === "flight") {
      setDetails({
        title: `${searchParams.get("from")} to ${searchParams.get("to")}`,
        subtitle: `${searchParams.get("airline") || "Premium Airline"} • ${searchParams.get("class") || "Economy"}`,
        date: searchParams.get("date"),
        extra: `Adults: ${searchParams.get("adults") || 1}`
      });
    } else if (bookingType === "hotel") {
      setDetails({
        title: searchParams.get("hotelName") || "Luxury Hotel Stay",
        subtitle: searchParams.get("city") || "Destination",
        date: `${searchParams.get("checkin")} - ${searchParams.get("checkout")}`,
        extra: `Rooms: ${searchParams.get("rooms") || 1} • Guests: ${searchParams.get("guests") || 1}`
      });
    } else if (bookingType === "bus") {
      setDetails({
        title: `${searchParams.get("from")} to ${searchParams.get("to")}`,
        subtitle: `${searchParams.get("operator") || "Luxury Intercity Bus"}`,
        date: searchParams.get("date"),
        extra: "Standard Sleeper/Seater"
      });
    } else {
      setDetails({
        title: searchParams.get("title") || "Holiday Package",
        subtitle: "All-inclusive Premium Tour",
        date: "Flexible Dates",
        extra: "Per Person Basis"
      });
    }
  }, [searchParams, user]);

  // Calculations
  const baseFare = Math.round(price * 0.88);
  const taxesAndFees = Math.round(price * 0.12);
  const totalAmount = price;

  // Functions to manage dynamic co-travelers
  const addCoTraveler = () => {
    setCoTravelers([...coTravelers, ""]);
  };

  const handleCoTravelerChange = (index: number, val: string) => {
    const updated = [...coTravelers];
    updated[index] = val;
    setCoTravelers(updated);
  };

  const removeCoTraveler = (index: number) => {
    setCoTravelers(coTravelers.filter((_, i) => i !== index));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert("Please fill in all traveler details.");
      return;
    }

    // Check if any added co-traveler name is empty
    if (coTravelers.some(t => t.trim() === "")) {
      alert("Please fill in all Co-Traveler names or remove the extra rows.");
      return;
    }

    setLoading(true);

    try {
      if (typeof window === "undefined" || !(window as any).Razorpay) {
        alert("Razorpay SDK failed to load. Please refresh the page.");
        setLoading(false);
        return;
      }

      const orderRes = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert("Failed to create order. Try again.");
        setLoading(false);
        return;
      }

      // Compile all travelers list for DB reference
      const allTravelers = [name, ...coTravelers.filter(t => t.trim() !== "")];

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Mallick Travels",
        description: `Payment for ${type.toUpperCase()} booking`,
        order_id: orderData.id,
        handler: async function (response: any) {
          const saveBookingRes = await fetch("/api/create-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.id || null,
              type: type,
              title: `${details.title} (${allTravelers.length} Travelers)`, // Title includes count
              price: totalAmount,
              travelerName: allTravelers.join(", "), // Saving comma separated list of all names
              travelerEmail: email,
              travelerPhone: phone,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              status: "completed",
            }),
          });

          if (saveBookingRes.ok) {
            router.push(`/payment-success?paymentId=${response.razorpay_payment_id}`);
          } else {
            alert("Payment successful but booking failed to save. Please contact support.");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-950 to-black text-white pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top bar with back option */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 pl-1">
            <span>Search</span>
            <ChevronRight size={14} />
            <span>Select Option</span>
            <ChevronRight size={14} />
            <span className="text-blue-400 font-medium">Secure Checkout</span>
          </div>

          {/* RETURN BUTTON: Dynamic Go Back Link */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Modify Booking / Go Back
          </button>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Review Your Booking</h1>

        {/* Responsive Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* LEFT SIDE: Traveler Information Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Trust Banner */}
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400 text-sm">
              <ShieldCheck size={20} className="shrink-0" />
              <p>Your booking is protected by premium insurance and secured with industry-standard encryption.</p>
            </div>

            {/* Traveler Details Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Primary Traveler Information</h2>
                  <p className="text-xs text-gray-400">Main contact for tickets/vouchers delivery</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Full Name (Primary Traveler)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Debojyoti Das"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* ADDITIONAL TRAVELERS SECTION */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-md font-bold text-white">Co-Travelers / Other Guests</h3>
                      <p className="text-xs text-gray-400">Add details for secondary travelers</p>
                    </div>
                    <button
                      type="button"
                      onClick={addCoTraveler}
                      className="flex items-center gap-1 text-xs font-semibold bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Plus size={14} />
                      Add Traveler
                    </button>
                  </div>

                  {coTravelers.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-sm text-gray-500">
                      No additional travelers added yet. Click "+ Add Traveler" if traveling with more people.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {coTravelers.map((traveler, idx) => (
                        <div key={idx} className="flex items-center gap-3 animate-fadeIn">
                          <span className="text-xs text-gray-400 w-6 font-medium">#{idx + 1}</span>
                          <div className="relative flex-1">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              required
                              value={traveler}
                              onChange={(e) => handleCoTravelerChange(idx, e.target.value)}
                              placeholder={`Traveler ${idx + 1} Full Name`}
                              className="h-11 w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCoTraveler(idx)}
                            className="text-gray-500 hover:text-red-400 transition p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 pt-2 leading-relaxed">
                  By clicking "Proceed to Payment", you agree to Mallick Travels' Luxury Booking Policy and Terms of Service.
                </p>

                {/* Submit button for mobile view */}
                <div className="pt-2 lg:hidden">
                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all shadow-lg shadow-blue-600/20">
                    {loading ? "Processing Secure Connection..." : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
                  </Button>
                </div>
              </form>
            </div>

            {/* Payment Guarantee trust factors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4 text-xs text-gray-400">
                <CreditCard className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-white mb-0.5">Secure Payments</p>
                  <p>104-bit SSL encryption safeguards your card details.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4 text-xs text-gray-400">
                <Clock className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-white mb-0.5">Instant Ticket</p>
                  <p>Receive live PDF voucher immediately after billing approval.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4 text-xs text-gray-400">
                <MapPin className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-white mb-0.5">24/7 Premium Help</p>
                  <p>Dedicated luxury support desk for active on-tour changes.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Sticky Summary Sidebar */}
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Ticket/Booking Abstract Box */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-black p-6 shadow-2xl overflow-hidden relative">
              <div className="absolute -right-8 -top-8 h-24 w-24 bg-blue-500/10 rounded-full blur-2xl" />
              
              <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 mb-4 uppercase tracking-wider">
                {type} itinerary
              </span>

              <h3 className="text-xl font-bold tracking-tight text-white mb-1">{details.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{details.subtitle}</p>

              <div className="space-y-3 border-y border-white/10 py-4 mb-6 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400 shrink-0" />
                  <span>{details.date || "Loading itinerary date..."}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plane size={16} className="text-gray-400 shrink-0" />
                  <span>Total Travelers: {coTravelers.length + 1}</span>
                </div>
              </div>

              {/* Price Breakup */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Price Summary</h4>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex justify-between">
                  <span>Base Fare & Platform Fees</span>
                  <span className="text-white">₹{baseFare.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Integrated GST & Insurance Tolls</span>
                  <span className="text-white">₹{taxesAndFees.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-white/20 pt-3 text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-blue-400 text-lg">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <div className="hidden lg:block">
                <Button 
                  onClick={handlePayment}
                  disabled={loading} 
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
                >
                  {loading ? "Processing..." : `Proceed to Payment`}
                  {!loading && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}
                </Button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading secure payment gateway...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}