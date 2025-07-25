"use client";
import { Job } from "@/types/job";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = async () => {
    const [bookmarks, setBookmarks] = useState<Job[]>([]);
    const router = useRouter();

    const res = await fetch("/api/handler")
    if (res.ok) {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Failed fetching bookmarks");
            }
            setBookmarks(data.data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    } else {
        toast("Sign in to see bookmarks", {
            action: {
                label: "Sign in",
                onClick: () => router.push("/sign-in"),
            },

        });
    }

    return <div>{JSON.stringify({ bookmarks })}</div>;
};

export default Page;
