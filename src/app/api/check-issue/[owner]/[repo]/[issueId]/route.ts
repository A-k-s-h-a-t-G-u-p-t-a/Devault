import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { owner: string; repo: string; issueId: string }}) {
  try {
    console.log("Received Params:", params);

    const { owner, repo, issueId } = params;

    if (!owner || !repo || !issueId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}`,
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch issue data" }, { status: response.status });
    }

    const issue = await response.json();
    return NextResponse.json({ isResolved: issue.state === "closed" });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

  