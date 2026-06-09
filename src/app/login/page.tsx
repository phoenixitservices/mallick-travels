"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plane, Sparkles, Globe2, ArrowLeft, KeyRound, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type LoginMethod = "otp" | "password";

export default function LoginPage() {
  const router = useRouter();

  // Authentication Method State
  const [method, setMethod] = useState<LoginMethod>("otp");
  const [step, setStep] = useState(1); // Used for OTP multi-step flow
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // 1. OTP LOGIN: Send OTP
  async function handleSendOtp() {
    if (!email) return alert("Please enter your email address");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false, // Prevents creating a new account if they aren't registered
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setStep(2);
    }
    setLoading(false);
  }

  // 2. OTP LOGIN: Verify OTP & Sign In
  async function handleVerifyOtp() {
    if (!otp) return alert("Please enter the OTP");
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email",
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  }

  // 3. PASSWORD LOGIN: Sign In
  async function handlePasswordLogin() {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  }

  // 4. GOOGLE LOGIN
  async function handleGoogleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert(error.message);
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

      {/* Main Container */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="hidden flex-col justify-between p-10 lg:flex">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-xl">
              <Globe2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Mallick Travels</h1>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-300">Premium Travel</p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-5 uppercase tracking-[0.4em] text-cyan-300">WELCOME BACK</p>
            <h2 className="max-w-lg text-5xl font-black leading-tight text-white">Log in to Explore Your Next Destination.</h2>
          </motion.div>

          <div className="flex items-center gap-3 text-gray-300">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            Access your bookings and customized itineraries.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
            
            {/* Card wrapper */}
            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Header logic */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  {method === "otp" && step === 2 && (
                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition">
                      <ArrowLeft className="h-6 w-6" />
                    </button>
                  )}
                  <h1 className="text-4xl font-black text-white">Welcome Back</h1>
                </div>
                <p className="mt-2 text-gray-400">
                  {method === "otp" && step === 2 ? `We sent a code to ${email}` : "Choose your preferred login option."}
                </p>
              </div>

              {/* Category Method Switcher (Only visible at step 1) */}
              {step === 1 && (
                <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-1.5 border border-white/5">
                  <button
                    onClick={() => setMethod("otp")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
                      method === "otp" ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    OTP Login
                  </button>
                  <button
                    onClick={() => setMethod("password")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
                      method === "password" ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <KeyRound className="h-4 w-4" />
                    Password
                  </button>
                </div>
              )}

              {/* Form Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${method}-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* CATEGORY 1: OTP Flow */}
                  {method === "otp" && (
                    <>
                      {step === 1 ? (
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
                            {loading ? "Sending Code..." : "Send OTP"}
                          </motion.button>
                        </>
                      ) : (
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
                            {loading ? "Verifying..." : "Verify & Login"}
                          </motion.button>
                        </>
                      )}
                    </>
                  )}

                  {/* CATEGORY 2: Password Flow */}
                  {method === "password" && (
                    <>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePasswordLogin}
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                      >
                        {loading ? "Logging in..." : "Login"}
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* CATEGORY 3: Google Login & Extras (Only visible during Step 1 choice) */}
              {step === 1 && (
                <>
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 py-4 font-medium text-white transition hover:bg-white/20"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                    Continue with Google
                  </motion.button>

                  <p className="mt-6 text-center text-gray-400">
                    Don't have an account?
                    <Link href="/signup" className="ml-2 font-semibold text-cyan-300 hover:text-cyan-200">
                      Sign Up
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
