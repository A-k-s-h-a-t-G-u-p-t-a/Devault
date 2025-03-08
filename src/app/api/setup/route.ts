import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function POST(req: Request) {
  console.log("POST request received");
  try {
    const authData = await auth();
    console.log("Auth data:", authData);
    const userId = authData.userId;

    if (!userId) {
      console.warn("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    let body;
    try {
      body = await req.json();
      console.log("Request body:", body);
    } catch (error) {
      console.error("Invalid JSON payload:", error);
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    console.log("Request body:",1);
    if (!body || typeof body !== "object") {
      console.warn("Invalid request body");
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    console.log("Request body:",2);
    const { githubUsername } = body;
    if (!githubUsername) {
      console.warn("GitHub username is required");
      return NextResponse.json({ error: "GitHub username is required" }, { status: 400 });
    }
    console.log("Request body:",3);
    // Upsert user in the database
    let user;
    try {
      console.log(4);
      console.log("User ID:", userId);
      user = await prisma.user.findUnique({
        where: { userId: userId },
      });
      if (user) {
        console.log(5);
        console.log("User found:", user);
        user = await prisma.user.update({
          where: { userId: userId },
          data: { username: githubUsername, email: "", passwordHash: "" },
        });
      } else {
        console.log(6);
        user = await prisma.user.create({
          data: { userId: userId, username: githubUsername, email: "", passwordHash: "" },
        });
      }
      console.log("User upserted:", user);
    } catch (dbError) {
      console.log(7)
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    try {
      // Fetch GitHub user details
      const { data } = await axios.get(`https://api.github.com/users/${githubUsername}`);
      console.log("GitHub user data:", data);

      if (!data || typeof data !== "object") {
        console.error("Invalid GitHub response");
        return NextResponse.json({ error: "Invalid GitHub response" }, { status: 500 });
      }

      const { avatar_url, id: githubId } = data;

      // Update user with GitHub details
      await prisma.user.update({
        where: { userId: userId },
        data: { photo: avatar_url, githubId: githubId.toString() },
      });
      console.log("User updated with GitHub details");

      // Fetch GitHub repositories
      const { data: repos } = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
      console.log("GitHub repositories:", repos);

      if (!Array.isArray(repos) || repos.length === 0) {
        console.warn("No repositories found for user:", githubUsername);
        return NextResponse.json({ message: "Setup complete (no repositories found)" });
      }

      const projects = repos.map((repo: any) => ({
        ownerId: user.id,
        title: repo.name,
        description: repo.description || "",
        githubRepoId: repo.id.toString(),
        githubRepoUrl: repo.html_url,
      }));
      console.log("Projects to insert:", projects);

      // Insert repositories into the database if there are any
      if (projects.length > 0) {
        await prisma.project.createMany({ data: projects });
        console.log("Projects inserted into the database");
      }

      return NextResponse.json({ message: "Setup complete" });
    } catch (githubError) {
      console.error("GitHub API error:", githubError);
      return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}