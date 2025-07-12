import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "123456") {
    (await cookies()).set("token", "fake-session-token", {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
