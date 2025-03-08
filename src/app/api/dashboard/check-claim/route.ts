import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Ensure correct import path

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user from the request headers
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the GitHub ID of the logged-in user
    const owner = await prisma.user.findUnique({
      where: { userId },
      select: { githubId: true },
    });

    if (!owner || !owner.githubId) {
      return NextResponse.json({ error: "GitHub ID not linked" }, { status: 400 });
    }

    // Fetch claimed issues where the logged-in user is the owner
    const claimedIssues = await prisma.claimIssue.findMany({
      where: { owner: owner.githubId },
      select: {
        id: true,
        walletAddress: true,
        issueId: true,
        user: { select: { username: true, githubId: true } }, // Fetch user details
      },
    });

    return NextResponse.json({ claimedIssues }, { status: 200 });
  } catch (error) {
    console.error("Error fetching claimed issues:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
