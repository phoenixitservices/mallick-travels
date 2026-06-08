"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function InquiryForm({
    packageId,
}: {
    packageId: string;
}) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const inquiry = {
            package_id: packageId,
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            travelers_count: Number(
                formData.get("travelers_count")
            ),
            budget_range: formData.get("budget_range"),
        };

        const { error } = await supabase
            .from("inquiries")
            .insert([inquiry]);

        setLoading(false);

        if (error) {
            alert("Something went wrong");
            console.error(error);
            return;
        }

        alert("Inquiry submitted successfully!");

        e.currentTarget.reset();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl bg-white p-8 shadow-xl"
        >
            <h3 className="text-3xl font-bold">
                Book This Tour
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

                <input
                    name="first_name"
                    placeholder="First Name"
                    required
                    className="rounded-xl border p-3"
                />

                <input
                    name="last_name"
                    placeholder="Last Name"
                    required
                    className="rounded-xl border p-3"
                />
            </div>

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border p-3"
            />

            <input
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full rounded-xl border p-3"
            />

            <input
                type="number"
                name="travelers_count"
                placeholder="Travelers Count"
                defaultValue={1}
                className="w-full rounded-xl border p-3"
            />

            <div className="relative">
                <select
                    name="budget_range"
                    className="w-full appearance-none rounded-xl border p-3 pr-10"
                >
                    <option>Budget Range</option>
                    <option>₹20,000 - ₹50,000</option>
                    <option>₹50,000 - ₹1,00,000</option>
                    <option>₹1,00,000+</option>
                </select>

                <ChevronDown
                    size={18}
                    className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                    "
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-6 text-lg"
            >
                {loading ? "Submitting..." : "Send Inquiry"}
            </Button>
        </form>
    );
}