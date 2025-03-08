import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = params;
  
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json({
    name: data.name,
    avatar_url: data.avatar_url,
  });
}