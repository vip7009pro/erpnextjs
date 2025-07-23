'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HomeContent from '@/components/HomeContent';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token',token)
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HomeContent onLogout={handleLogout} />
    </div>
  );
}