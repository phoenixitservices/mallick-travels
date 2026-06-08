import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id:
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {

  const body = await req.json();

  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt:
      "receipt_order_" +
      Math.random(),
  };

  try {

    const order =
      await razorpay.orders.create(
        options
      );

    return NextResponse.json(order);

  } catch (error) {

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}