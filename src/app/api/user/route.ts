import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path as needed

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { username: true, photo: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
