import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  console.log(session);

  return NextResponse.json({ success: true });
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
