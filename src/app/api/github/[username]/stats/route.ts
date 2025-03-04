import { NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    // Fetch user profile stats
    const userRes = await fetch(`${GITHUB_API_URL}/users/${username}`);
    const userData = await userRes.json();

    if (!userRes.ok) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Fetch commit activity
    const commitRes = await fetch(`${GITHUB_API_URL}/repos/${username}/${username}/stats/commit_activity`);
    const commitData = commitRes.ok ? await commitRes.json() : [];

    // Fetch language usage
    const langRes = await fetch(`${GITHUB_API_URL}/repos/${username}/${username}/languages`);
    const langData = langRes.ok ? await langRes.json() : {};

    // Fetch pull request stats
    const prRes = await fetch(`${GITHUB_API_URL}/search/issues?q=author:${username}+type:pr`);
    const prData = prRes.ok ? await prRes.json() : { total_count: 0, items: [] };

    // Process commit activity (last 10 weeks)
    const commitStats = commitData.slice(-10).map((week: any) => ({
      week: new Date(week.week * 1000).toLocaleDateString(),
      commits: week.total
    }));

    // Process language usage
    const totalBytes = Object.values(langData).reduce((acc: number, val: any) => acc + val, 0);
    const languageStats = Object.entries(langData).map(([lang, bytes]) => ({
      language: lang,
      percentage: ((bytes as number) / totalBytes) * 100
    }));

    // Process PR stats
    const openPRs = prData.items.filter((pr: any) => pr.state === "open").length;
    const closedPRs = prData.items.filter((pr: any) => pr.state === "closed").length;

    return NextResponse.json({
      followers: userData.followers,
      following: userData.following,
      public_repos: userData.public_repos,
      commitStats,
      languageStats,
      pullRequests: {
        total: prData.total_count,
        open: openPRs,
        closed: closedPRs
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
