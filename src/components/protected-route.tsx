"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuth } from "@/context/auth-context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loading } =
    useAuth();

  const router = useRouter();

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }

  }, [user, loading]);

  if (!user) return null;

  return children;
}