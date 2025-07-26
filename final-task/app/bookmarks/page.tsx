"use client";
import JobCard from "@/components/JobCard";
import { Job } from "@/types/job";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
    const [bookmarks, setBookmarks] = useState<Job[]>([]);
    const router = useRouter();
    const { data: session, status } = useSession()

    console.log({ session, status })
    useEffect(() => {
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
        const checkBookmark = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
            })
            const data = await res.json()
            console.log(data.data)
            setBookmarks(data.data)
            console.log(bookmarks)
        }
        checkBookmark()
    }, [])
    useEffect(() => {
        console.log("Updated bookmarks:", bookmarks);
        console.log("Bookmark sample:", bookmarks[0])

    }, [bookmarks]);
    if (status == "loading") return <h1>Loading...</h1>
    return (
        <div>
            <h1>Bookmarked Jobs</h1>
            <div className="space-y-4">

                {bookmarks.map((bookmark, idx) => (
                    <JobCard
                        key={idx}
                        id={bookmark.id}
                        image={bookmark.logoUrl}
                        title={bookmark.title}
                        description={bookmark.description}
                        responsibilities={bookmark.responsibilities}
                        company={bookmark.orgName}
                        location={bookmark.location}
                        work_type={bookmark.opType}
                        position_type={bookmark.categories}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
