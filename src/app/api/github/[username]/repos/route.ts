import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) {
    return NextResponse.json({ error: "Repositories not found" }, { status: 404 });
  }

  const repos = await res.json();
  return NextResponse.json(repos.map((repo: any) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
  })));
}
