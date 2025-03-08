import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string; issueId: string } }
) {
  try {
    console.log("Received Params:", params);

    const { owner, repo, issueId } = params;

    if (!owner || !repo || !issueId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}/events`,
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch issue events" }, { status: response.status });
    }

    const events = await response.json();

    // Find a PR that referenced or closed the issue
    const closingEvent = events.find((event: any) =>
      ["cross-referenced", "closed", "referenced"].includes(event.event) &&
      event.source &&
      event.source.issue &&
      event.source.issue.pull_request
    );

    if (!closingEvent) {
      return NextResponse.json({ linkedPR: null, message: "No linked PR found" });
    }

    const prUrl = closingEvent.source.issue.pull_request.url; // Get PR API URL

    // Fetch additional PR details
    const prResponse = await fetch(prUrl, {
    });

    if (!prResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch PR details" }, { status: prResponse.status });
    }

    const prData = await prResponse.json();

    return NextResponse.json({ linkedPR: prData.html_url }); // Return PR URL
  } catch (error) {
    console.error("Error fetching linked PR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


  