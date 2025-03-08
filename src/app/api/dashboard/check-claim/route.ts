import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Ensure correct import path

export async function GET(req: NextRequest) {
  try {
    console.log("🔹 Incoming API request to fetch claimed issues...");

    // Get the authenticated user from Clerk
    const { userId } = getAuth(req);
    console.log("🔹 Authenticated User ID:", userId);

    if (!userId) {
      console.log("❌ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the GitHub ID of the logged-in user
    const owner = await prisma.user.findUnique({
      where: { userId },
      select: { githubId: true },
    });

    console.log("🔹 Owner Data from DB:", owner);

    if (!owner || !owner.githubId) {
      console.log("❌ GitHub ID not found");
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

    console.log("✅ Claimed Issues:", claimedIssues);

    return NextResponse.json({ claimedIssues }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching claimed issues:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
