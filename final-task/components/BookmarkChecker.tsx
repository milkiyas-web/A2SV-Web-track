"use client";

import { toast } from "sonner";
import { Toggle } from "./ui/toggle";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Bookmarked = {
    id: string;
};

export function BookmarkChecker({ id }: Bookmarked) {
    const router = useRouter();

    const [isBookmarked, setIsBookmarked] = useState(false)
    const { data: session, status } = useSession()
    // useEffect(() => {
    //     if (status !== "authenticated") {
    //         toast("Please sign in before bookmarking a job", {
    //             description: "Sign in now to bookmark",
    //             action: {
    //                 label: "Sign in",
    //                 onClick: () => router.push("/sign-in"),
    //             },
    //         });
    //         return;
    //     }
    //     const checkBookmark = async () => {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`, {
    //             method: "GET",
    //         })
    //         const data = await res.json()

    //         const alreadyBookmarked = data?.bookmarks?.some(
    //             (bookmark: any) => bookmark.eventId === id
    //         );
    //         setIsBookmarked(!!alreadyBookmarked);
    //     }
    // })
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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/${id}`,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                    body: JSON.stringify({})
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
