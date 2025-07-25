import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ message: "Authenticated", user: session.user }),
    { status: 200 }
  );
}
// app/api/bookmarks/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const backendRes = await fetch(
//       "https://akil-backend.onrender.com/bookmarks",
//       {
//         method: "GET",
//         headers: {
//           Cookie: req.headers.get("cookie") || "",
//         },
//         credentials: "include",
//       }
//     );

//     const data = await backendRes.json();

//     return NextResponse.json(data, { status: backendRes.status });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal Server Error", error },
//       { status: 500 }
//     );
//   }
// }
