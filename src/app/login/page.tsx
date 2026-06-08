"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plane } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
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

  return (
    <main className="relative flex min-h-screen overflow-hidden">

      {/* LEFT SIDE */}
      <div className="relative hidden w-1/2 lg:block">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
          alt="Travel"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        {/* Floating Gradient */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />

        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-14 text-white">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-2xl">

              <Plane className="h-6 w-6" />

            </div>

            <div>

              <h1 className="text-3xl font-black">
                Mallick Travels
              </h1>

              <p className="text-sm uppercase tracking-[0.4em] text-gray-300">
                Luxury Travel
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div>

            <p className="mb-6 uppercase tracking-[0.5em] text-gray-300">
              Explore The World
            </p>

            <h2 className="max-w-xl text-6xl font-black leading-tight">

              Your Journey
              Begins Here.

            </h2>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-200">

              Discover luxury hotels, flights,
              unforgettable destinations and
              premium travel experiences.

            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-8 text-sm text-gray-300">

            {/* <div>
              <h3 className="text-3xl font-bold text-white">
                50K+
              </h3>

              Travelers
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                120+
              </h3>

              Countries
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                4.9★
              </h3>

              Ratings
            </div> */}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex w-full items-center justify-center bg-black lg:w-1/2">

        {/* Background Effects */}
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">

          <div className="mb-10">

            <p className="uppercase tracking-[0.4em] text-gray-400">
              Welcome Back
            </p>

            <h1 className="mt-4 text-5xl font-black text-white">
              Login
            </h1>

            <p className="mt-4 text-gray-400">
              Continue your luxury travel experience.
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-400">

            Don’t have an account?

            <Link
              href="/signup"
              className="ml-2 font-semibold text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}