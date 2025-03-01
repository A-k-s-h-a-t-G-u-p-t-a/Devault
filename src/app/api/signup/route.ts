import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) return new Response("Email and password are required", { status: 400 });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, passwordHash: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User created successfully", user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating user", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


