import { NextRequest, NextResponse } from "next/server";
import { fetchReadme, fetchIssues } from "../../utils/github";
import { generateSummary } from "../../utils/gemini";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Fetch README & Issues
    const [readme, issues] = await Promise.all([fetchReadme(owner, repo), fetchIssues(owner, repo)]);

    // Generate AI Summary
    const aiSummary = await generateSummary(readme, issues);

    return NextResponse.json({ summary: aiSummary });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
