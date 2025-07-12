import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ token });
}
