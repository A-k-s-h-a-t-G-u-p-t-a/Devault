import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const discussions = await prisma.discussion.findMany({
      include: { user: true, project: true, replies: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(discussions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch discussions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, category, userId, projectId } = await req.json();
    const discussion = await prisma.discussion.create({
      data: { title, content, category, userId, projectId },
    });
    return NextResponse.json(discussion);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create discussion" }, { status: 500 });
  }
}
