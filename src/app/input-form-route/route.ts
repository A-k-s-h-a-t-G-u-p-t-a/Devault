import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req:any) {
  try {
    // Extract authentication details
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { name, repoLink, description } = await req.json(); // Parse request body
    console.log(`${userId} ${name} ${repoLink}  ${description}`);

    // Store project in the database
    await prisma.project.create({
      data: {
        title: name,
        githubRepoUrl: repoLink,
        description:description,
        ownerId: userId, // Use Clerk's userId
      },
    });

    return new Response(JSON.stringify({ message: "Project submitted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error submitting project:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
