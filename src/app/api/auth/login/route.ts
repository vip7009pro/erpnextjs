import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

type LoginRequest = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  const { email, password }: LoginRequest = await req.json();

  // Giả lập user trong DB
  const user = {
    id: 1,
    email: 'admin@erpnext.com',
    password: await bcrypt.hash('123456', 10),
  };

  if (email !== user.email || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  (await cookies()).set('token', token, {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
    secure: process.env.NODE_ENV === 'production', // Chỉ secure trong production
  });

  return NextResponse.json({ message: 'Login successful' });
}