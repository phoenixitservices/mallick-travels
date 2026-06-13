"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plane } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Password Login Handler
  async function handlePasswordLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    setLoading(false);
  }

  // 2. Send OTP Handler
  async function handleSendOtp() {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    setLoading(true);

    // Call the Edge Function directly. It already checks the 'customers' table for you.
    const { data, error } = await supabase.functions.invoke("login-otp", {
      body: { action: "send", email },
    });

    // Handle Network/Invocation errors
    if (error) {
      alert("Function error: " + error.message);
      setLoading(false);
      return;
    }

    // Handle Custom Edge Function errors (e.g., "Account not found", "Account not active")
    if (data && !data.success) {
      alert(data.message);
      setLoading(false);
      return;
    }

    setOtpSent(true);
    alert("OTP sent to your email!");
    setLoading(false);
  }

  // 3. Verify OTP Handler
  async function handleVerifyOtp() {
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("login-otp", {
      body: { action: "verify", email, otp },
    });

    if (error) {
      alert("Function error: " + error.message);
      setLoading(false);
      return;
    }

    // Handle invalid/expired OTP errors from your Edge Function
    if (data && !data.success) {
      alert(data.message);
      setLoading(false);
      return;
    }

    // Success! 
    console.log("Logged in user:", data); // Contains user_id, email, customers_id
    router.push("/");
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden">
      {/* FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
          alt="Travel Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex w-full">
        {/* LEFT SIDE */}
        <div className="relative hidden w-1/2 flex-col justify-between p-14 text-white lg:flex">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

          {/* Logo */}
          <div className="z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-2xl">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Mallick Travels</h1>
              <p className="text-sm uppercase tracking-[0.4em] text-gray-300">
                Luxury Travel
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="z-10">
            <p className="mb-6 uppercase tracking-[0.5em] text-gray-300">
              Explore The World
            </p>
            <h2 className="max-w-xl text-6xl font-black leading-tight">
              Your Journey Begins Here.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-200">
              Discover luxury hotels, flights, unforgettable destinations and
              premium travel experiences.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-300"></div>
        </div>

        {/* RIGHT SIDE (Form Division) */}
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Login Card */}
          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">
            <div className="mb-8">
              <p className="uppercase tracking-[0.4em] text-gray-300">
                Welcome Back
              </p>
              <h1 className="mt-2 text-4xl font-black text-white">Login</h1>
            </div>

            {/* TABS (Password vs OTP) */}
            <div className="mb-8 flex rounded-xl bg-black/20 p-1 backdrop-blur-md">
              <button
                onClick={() => {
                  setLoginMethod("password");
                  setOtpSent(false); // Reset OTP state if they switch
                }}
                className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition-all ${loginMethod === "password"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                Password
              </button>
              <button
                onClick={() => setLoginMethod("otp")}
                className={`w-1/2 rounded-lg py-2.5 text-sm font-semibold transition-all ${loginMethod === "otp"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                Login via OTP
              </button>
            </div>

            {/* Inputs Section */}
            <div className="space-y-5">
              {/* Email is common to both */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent} // Disable email input if OTP is sent
                className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 focus:border-blue-500 focus:outline-none disabled:opacity-50"
              />

              {/* Conditional: Password Input */}
              {loginMethod === "password" && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 focus:border-blue-500 focus:outline-none"
                />
              )}

              {/* Conditional: OTP Input */}
              {loginMethod === "otp" && otpSent && (
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 focus:border-blue-500 focus:outline-none tracking-widest"
                />
              )}

              {/* Dynamic Buttons */}
              {loginMethod === "password" ? (
                <button
                  onClick={handlePasswordLogin}
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              ) : (
                <button
                  onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                  disabled={loading || !email}
                  className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : otpSent
                      ? "Verify OTP & Login"
                      : "Send OTP Code"}
                </button>
              )}
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-gray-300">
              Don’t have an account?
              <Link
                href="/signup"
                className="ml-2 font-semibold text-blue-400 transition-colors hover:text-blue-300"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
