import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const token = jwt.sign({ username, password }, process.env.JWT_SECRET as string);

  if (username === "admin" && password === "123456") {
    (await cookies()).set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
