import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const user = await currentUser(); // Get logged-in user

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: user.id }, // Ensure this is the correct format
      select: {
        id: true,
        title: true,
        githubRepoUrl: true,
        description: true,
        currentFunding: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
