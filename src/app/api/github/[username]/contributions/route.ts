import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  const res = await fetch(`https://api.github.com/users/${username}/events/public`);
  if (!res.ok) {
    return NextResponse.json({ error: "Contributions not found" }, { status: 404 });
  }

  const events = await res.json();

  // Extract relevant data
  const contributions = events
    .filter((event: any) =>
      ["PushEvent", "PullRequestEvent", "IssueCommentEvent"].includes(event.type)
    )
    .map((event: any) => ({
      type: event.type,
      repo: event.repo.name,
      date: event.created_at,
      details:
        event.type === "PushEvent"
          ? event.payload.commits.map((c: any) => c.message).join(", ")
          : event.type === "PullRequestEvent"
          ? `Pull Request ${event.payload.action}`
          : event.type === "IssueCommentEvent"
          ? `Commented: ${event.payload.comment.body}`
          : "Other",
    }));

  return NextResponse.json(contributions);
}
