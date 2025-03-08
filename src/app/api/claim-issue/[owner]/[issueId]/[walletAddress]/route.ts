import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // ✅ Instantiate Prisma client once

export async function POST(
  req: NextRequest,
  { params }: { params: { owner: string; issueId: string; walletAddress: string } }
) {
  try {
    console.log("Received Params:", params);

    const { owner, issueId, walletAddress } = params; // Extract params from route

    if (!walletAddress || !issueId || !owner) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Ensure issueId is a string (Prisma expects ObjectId as a string)
    const issueIdStr = String(issueId);

    // ✅ Check if the issue has already been claimed
    const existingClaim = await prisma.claimIssue.findFirst({
      where: {
        walletAddress,
        issueId: issueIdStr, // Ensure type consistency
      },
    });

    if (existingClaim) {
      console.log("Issue already claimed:", existingClaim);
      return NextResponse.json({ error: "Issue already claimed" }, { status: 400 });
    }

    // ✅ Create a new claim entry
    const claimData = {
      walletAddress,
      issueId: issueIdStr,
      owner,
    };
    console.log("Creating Claim:", claimData);

    const claim = await prisma.claimIssue.create({ data: claimData });

    return NextResponse.json({ message: "Issue claimed successfully", claim });
  } catch (error) {
    console.error("Error claiming issue:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
