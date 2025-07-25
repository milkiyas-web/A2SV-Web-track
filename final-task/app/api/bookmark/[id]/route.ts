import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { success } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const eventId = await params.id;
  console.log(`Bookmarking event ${eventId} for user ${session.user?.email}`);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const eventId = await params.id;
  console.log(`Bookmarking event ${eventId} for user ${session.user?.email}`);
  return NextResponse.json({ success: true });
}
