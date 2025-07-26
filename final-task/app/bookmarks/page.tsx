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
        if (status !== "authenticated" || !session?.accessToken) return;

        const checkBookmark = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            const data = await res.json();
            console.log("Full bookmarks response:", data);
            setBookmarks(data.data || []);
        };

        checkBookmark();
    }, [status, session]);


    if (status == "loading") return <h1>Loading...</h1>
    return (
        <div>
            <h1>Bookmarked Jobs</h1>
            <div className="max-w-4xl w-full mx-auto p-6 space-y-4">
                {bookmarks.map((bookmark, idx) => (

                    <JobCard
                        key={idx}
                        //id={bookmark.eventID}
                        eventID={bookmark.eventID}
                        image={bookmark.logoUrl}
                        title={bookmark.title}
                        responsibilities={""}
                        company={bookmark.orgName}
                        location={bookmark.location}
                        work_type={bookmark.opType}
                        position_type={[]}
                        initialIsBookmarked={true}
                    />

                ))}
            </div>
        </div>
    );
};

export default Page;
