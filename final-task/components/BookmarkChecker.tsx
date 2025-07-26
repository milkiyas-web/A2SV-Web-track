"use client";

import { toast } from "sonner";
import { Toggle } from "./ui/toggle";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Bookmarked = {
    id: string;
    initialIsBookmarked: boolean;
    // id: string;
};

export function BookmarkChecker({ id, initialIsBookmarked }: Bookmarked) {
    const router = useRouter();
    const [isBookmarked, setIsBookmarked] = useState<boolean>(initialIsBookmarked ?? false)
    const { data: session, status } = useSession()
    useEffect(() => {
        if (status !== "authenticated") return;

        if (typeof initialIsBookmarked === "boolean") return;

        const checkBookmark = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                });

                const data = await res.json();
                const alreadyBookmarked = data?.data.bookmarks?.some(
                    (bookmark: any) => bookmark.eventID === id
                );

                setIsBookmarked(!!alreadyBookmarked);
            } catch (err) {
                console.error("Error checking bookmark status:", err);
            }
        };

        checkBookmark();
    }, [status, session, initialIsBookmarked]);


    const toggleBookmark = async (id: string) => {

        if (status !== "authenticated") {
            toast("Please sign in before bookmarking a job", {
                description: "Sign in now to bookmark",
                action: {
                    label: "Sign in",
                    onClick: () => router.push("/sign-in"),
                },
            });
            return;
        }
        try {
            const method = isBookmarked ? "DELETE" : "POST"
            console.log("eventID:", id, "isBookmarked:", isBookmarked, "method:", method);
            if (method == "DELETE") {
                console.log("Trying to DELETE bookmark with ID:", id);

            }
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/${id}`,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                    ...(method === "POST" ? { body: JSON.stringify({}) } : {})
                }
            );


            const data = await res.json();
            console.log(data)
            if (res.ok) {
                setIsBookmarked(!isBookmarked)
                toast.success(
                    isBookmarked ?
                        "Bookmark removed"
                        :
                        "Job bookmarked"
                );
            } else {
                toast.error(data.error || "Bookmarking failed.");
            }

            console.log("Bookmark response:", data);
        } catch (err) {
            toast.error("An error occurred while bookmarking.");
            console.error("Bookmarking error:", err);
        }
    };

    return (
        <Toggle variant="outline" pressed={isBookmarked} onClick={() => toggleBookmark(id)}>
            {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
        </Toggle>
    );
}
