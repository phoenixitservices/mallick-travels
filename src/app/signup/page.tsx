"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plane, Sparkles, Globe2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  // Step Tracking
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Send OTP via Custom Edge Function
  async function handleSendOtp() {
    if (!email) return alert("Please enter an email address");
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("email-otp", {
      body: { action: "send", email },
    });

    if (error || !data?.success) {
      alert(error?.message || data?.message || "Failed to send OTP");
    } else {
      setStep(2);
    }
    setLoading(false);
  }

  // Step 2: Verify OTP via Custom Edge Function
  async function handleVerifyOtp() {
    if (!otp) return alert("Please enter the OTP");
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("email-otp", {
      body: { action: "verify", email, otp },
    });

    if (error || !data?.success) {
      alert(error?.message || data?.message || "Invalid OTP");
    } else {
      setStep(3);
    }
    setLoading(false);
  }

  // Step 3: Complete Account Setup (Auth User + Customer Record)
  async function handleCompleteSetup() {
    if (!firstName || !lastName) return alert("Please enter your full name");
    if (!phone) return alert("Please enter your phone number");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (password.length < 6) return alert("Password must be at least 6 characters");
    
    setLoading(true);

    // 1. Create the user in standard Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
      },
    });

    if (authError) {
      alert(authError.message);
      setLoading(false);
      return;
    }

    // 2. Create the Customer record in public.customers
    const { error: customerError } = await supabase
      .from("customers")
      .insert({
        name: `${firstName} ${lastName}`.trim(),
        email: email,
        phone: phone,
        status: "prospect", // Default from your schema
        created_by: authData.user?.id, // Linking to the newly created auth user
      });

    if (customerError) {
      console.error("Error creating customer record:", customerError);
      alert("Account created, but failed to setup customer profile. Please contact support.");
    }

    // Redirect to dashboard or home after successful registration
    router.push("/");
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
          alt="Travel"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Animated Blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* Floating Plane */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-20 top-20 hidden lg:block"
      >
        <Plane className="h-16 w-16 text-white/20" />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden flex-col justify-between p-10 lg:flex">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-xl">
              <Globe2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Mallick Travels</h1>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-300">Premium Travel</p>
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-5 uppercase tracking-[0.4em] text-cyan-300">EXPLORE THE WORLD</p>
            <h2 className="max-w-lg text-5xl font-black leading-tight text-white">Your Dream Vacation Starts Here.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300">
              Book luxury hotels, flights, tours and unforgettable travel experiences worldwide.
            </p>
{/* 
            
            <div className="mt-8 flex gap-4">
              <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                <h3 className="text-2xl font-bold text-white">200+</h3>
                <p className="text-sm text-gray-300">Destinations</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                <h3 className="text-2xl font-bold text-white">50K+</h3>
                <p className="text-sm text-gray-300">Travelers</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                <h3 className="text-2xl font-bold text-white">4.9★</h3>
                <p className="text-sm text-gray-300">Reviews</p>
              </motion.div>
            </div> */}
          </motion.div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-3 text-gray-300">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            Premium travel experiences curated worldwide.
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Mallick Travels</h1>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Luxury Travel</p>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="mb-8">
                
                <div className="flex items-center gap-3">
                  {step > 1 && (
                    <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-white transition">
                      <ArrowLeft className="h-6 w-6" />
                    </button>
                  )}
                  <h1 className="text-4xl font-black text-white">
                    {step === 1 && "Create Account"}
                    {step === 2 && "Verify Email"}
                    {step === 3 && "Almost Done"}
                  </h1>
                </div>
                <p className="mt-3 text-gray-400">
                  {step === 1 && "Start your luxury travel journey."}
                  {step === 2 && `We sent a code to ${email}`}
                  {step === 3 && "Set up your profile and password."}
                </p>
              </div>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* STEP 1: Email */}
                  {step === 1 && (
                    <>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                      >
                        {loading ? "Sending Code..." : "Continue"}
                      </motion.button>
                    </>
                  )}

                  {/* STEP 2: OTP */}
                  {step === 2 && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                      >
                        {loading ? "Verifying..." : "Verify Code"}
                      </motion.button>
                    </>
                  )}

                  {/* STEP 3: Details */}
                  {step === 3 && (
                    <>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCompleteSetup}
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                      >
                        {loading ? "Creating..." : "Create Account"}
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Show Social Login & Link to Login only on Step 1 */}
              {step === 1 && (
                <>
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 py-4 font-medium text-white transition hover:bg-white/20"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                    Continue with Google
                  </motion.button>

                  <p className="mt-6 text-center text-gray-400">
                    Already have an account?
                    <Link href="/login" className="ml-2 font-semibold text-cyan-300">
                      Login
                    </Link>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
