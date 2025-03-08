import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { discussionId, userId, content } = await req.json();
    const reply = await prisma.reply.create({
      data: { discussionId, userId, content },
    });
    return NextResponse.json(reply);
  } catch (error) {
    return NextResponse.json({ error: "Failed to post reply" }, { status: 500 });
  }
}
