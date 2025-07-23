import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

type LoginRequest = {
  email: string;
  password: string;
};

export async function POST(req: Request) { 
  const { email, password }: LoginRequest = await req.json();

  const user = {
    id: 1,
    email: 'admin@erpnext.com',
    password: await bcrypt.hash('123456', 10),
  };

  if (email !== user.email || !(await bcrypt.compare(password, user.password))) {
    console.log('Invalid credentials for:', email);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  console.log('Generated token for user:', email, 'Token:', token);
  (await cookies()).set('token', token, {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ message: 'Login successful' });
}