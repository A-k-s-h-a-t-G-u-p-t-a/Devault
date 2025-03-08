import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient(); // ✅ Instantiate Prisma client once

export async function POST(
  req: NextRequest,
  { params }: { params: { owner: string; issueId: string; walletAddress: string } }
) {
  try {
    const { userId } = await auth();
    console.log("Received Params:", params);

    const { owner, issueId, walletAddress } = params;

    if (!walletAddress || !issueId || !owner) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const issueIdStr = String(issueId);

    const existingClaim = await prisma.claimIssue.findFirst({
      where: {
        walletAddress,
        issueId: issueIdStr,
      },
    });

    if (existingClaim) {
      console.log("Issue already claimed:", existingClaim);
      return NextResponse.json({ error: "Issue already claimed" }, { status: 400 });
    }
    if (!userId) {
      console.log("User ID is missing");
      return NextResponse.json({ error: "User ID is missing" }, { status: 401 });
    }

    const claimData = {
      walletAddress,
      issueId: issueIdStr,
      owner,
      userId,
    };
    console.log("Creating Claim:", claimData);

    const claim = await prisma.claimIssue.create({ data: claimData });

    return NextResponse.json({ message: "Issue claimed successfully", claim });
  } catch (error) {
    console.error("Error claiming issue:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    
  }
}