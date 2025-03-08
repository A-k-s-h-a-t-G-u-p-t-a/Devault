import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Ensure correct import path

export async function GET(req: NextRequest) {
  try {
    console.log("🔹 Incoming API request to fetch claimed issues...");

    // Get authenticated user from Clerk
    const { userId } = getAuth(req);
    console.log("🔹 Authenticated User ID:", userId);

    if (!userId) {
      console.log("❌ Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the username of the logged-in user
    const owner = await prisma.user.findUnique({
      where: { userId },
      select: { username: true }, // Fetching 'username'
    });

    console.log("🔹 Fetched Owner from DB:", owner);

    if (!owner || !owner.username) {
      console.log("❌ Username not found");
      return NextResponse.json({ error: "Username not linked" }, { status: 400 });
    }

    console.log("🔹 Searching for claimed issues with owner:", owner.username);

    const claimedIssues = (await prisma.claimIssue.findMany({
      where: { owner: owner.username }, // Matching with 'username'
      select: {
        id: true,
        walletAddress: true,
        issueId: true,
        user: { select: { username: true } }, // Fetch only username
      },
    })) || [];

    console.log("✅ Claimed Issues before sending response:", claimedIssues);

    // Ensure claimedIssues is always an array
    return NextResponse.json(
      { claimedIssues: claimedIssues ?? [] }, // Always return an object
      { status: 200 }
    );
    
  } catch (error) {
    console.error("🚨 Error fetching claimed issues:", error);

    // Ensure the error response is always a valid object
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error)?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
