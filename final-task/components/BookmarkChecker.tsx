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
import { useSession } from "next-auth/react";

type Bookmarked = {
    id: string;
};

export function BookmarkChecker({ id }: Bookmarked) {
    const router = useRouter();
    const { data: session } = useSession();
    const isAuthenticated = !!session;

    const bookmarked = async (id: string) => {
        if (!isAuthenticated) {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            console.log("Bookmarked:", data);
        } catch (err) {
            console.error("Error bookmarking:", err);
        }
    };

    return (
        <Toggle variant="outline" onClick={() => bookmarked(id)}>
            <Bookmark />
        </Toggle>
    );
}
