import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// In production, store this in env vars and hash properly
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || "$2a$10$abcdefghijklmnopqrstuv"; // bcrypt hash of 'admin123'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Simple check - in production use proper env vars
    const validUser = username === (process.env.ADMIN_USER || "admin");
    const validPass = password === (process.env.ADMIN_PASS || "admin123");

    if (validUser && validPass) {
      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8, // 8 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
