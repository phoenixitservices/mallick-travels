import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  const body = await req.json();

  const { data, error } = await supabase
    .from("bookings")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}