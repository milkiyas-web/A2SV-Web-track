// "use client"

// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { useRouter } from "next/router"
// import { Bookmark } from "lucide-react"
// import { Toggle } from "./ui/toggle"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/authOptions"

// type Bookmarked = {
//     id: string
//     isAuthenticated: string
// }

// export async function BookmarkChecker({ id, isAuthenticated }: Bookmarked) {
//     const session = await getServerSession(authOptions);

//     const router = useRouter()
//     const bookmarked = async (id: string) => {
//         if (!session) {
//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/${id}`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                 })

//                 const data = res.json()
//                 console.log(data)
//             } catch (err) {
//                 console.log(err)
//             }
//         } else {
//             toast("Please sign in before bookmarking a job", {
//                 description: "Sign in now to bookmark",
//                 action: {
//                     label: "Sign in",
//                     // onClick: () => console.log("Undo"),
//                     onClick: () => router.push("/sign-in"),
//                     // onClick: () => <Link href="/sign-in">Sign in</Link>,
//                 },
//             })
//         }
//     }
//     return (
//         <Toggle
//             variant="outline"
//             onClick={() => bookmarked(id)}
//         // toast("Please sign in before bookmarking a job", {
//         //     description: "Sign in now to bookmark",
//         //     action: {
//         //         label: "Sign in",
//         //         // onClick: () => console.log("Undo"),
//         //         onClick: () => router.push("/sign-in"),
//         //         // onClick: () => <Link href="/sign-in">Sign in</Link>,
//         //     },
//         // })
//         >
//             <Bookmark />
//         </Toggle>
//     )
// }
"use client";

import { toast } from "sonner";
import { Toggle } from "./ui/toggle";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

type Bookmarked = {
    id: string;
};

export function BookmarkChecker({ id }: Bookmarked) {
    const router = useRouter();



    const bookmarked = async (id: string) => {

        const res = await fetch("/api/handler")
        // const data = await res.json()
        if (res.ok) {
            try {
                const res = await fetch(`/api/bookmark/${id}`, {
                    method: "POST",
                });

                const data = await res.json();
                if (res.ok) {
                    toast.success("Job bookmarked successfully!");
                } else {
                    toast.error(data.error || "Something went wrong");
                }
                console.log("Bookmarked:", data);
            } catch (err) {
                toast.error("An error occurred while bookmarking.");
                console.error("Error bookmarking:", err);
            }

        } else {
            toast("Please sign in before bookmarking a job", {
                description: "Sign in now to bookmark",
                action: {
                    label: "Sign in",
                    onClick: () => router.push("/sign-in"),
                },
            });
        }

    }

    return (
        <Toggle variant="outline" onClick={() => bookmarked(id)}>
            <Bookmark />
        </Toggle>
    );
}
