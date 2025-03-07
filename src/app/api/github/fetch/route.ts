import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com/users/";

export default async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
  try {
    const body = await req.json();
    console.log("Received body:", body); // Debugging log

    let { username } = body;
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Normalize username: Remove spaces & convert to lowercase
    username = username.trim().toLowerCase();

    // Fetch GitHub user data
    const userResponse = await fetch(`${GITHUB_API_URL}${username}`);
    if (!userResponse.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(userData.repos_url);
    if (!reposResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
    }

    const repositories = await reposResponse.json();

    // Store user in DB
    const user = await prisma.user.upsert({
      where: { username },
      update: { photo: userData.avatar_url, githubId: userData.id.toString() },
      create: {
        username,
        photo: userData.avatar_url,
        githubId: userData.id.toString(),
        email: userData.email || null, // GitHub may not return email
        clerkId: "", // Provide a default or generated value for clerkId
        passwordHash: "", // Provide a default or generated value for passwordHash
      },
    });

    // Store projects in DB
    const projects = await Promise.all(
      repositories.map(async (repo: any) => {
        return prisma.project.upsert({
          where: { githubRepoId: repo.id.toString() },
          update: {
            title: repo.name,
            description: repo.description,
            githubRepoUrl: repo.html_url,
          },
          create: {
            ownerId: user.id,
            title: repo.name,
            description: repo.description,
            githubRepoId: repo.id.toString(),
            githubRepoUrl: repo.html_url,
          },
        });
      })
    );

    return NextResponse.json({ message: "GitHub data stored successfully", user, projects });
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
