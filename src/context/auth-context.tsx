"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

const AuthContext =
  createContext<any>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);

      setLoading(false);
    }

    getUser();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(session?.user || null);
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}