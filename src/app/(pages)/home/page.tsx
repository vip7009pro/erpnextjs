'use client';
import { useRouter } from 'next/navigation';
import HomeContent from '@/components/HomeContent';
import LayoutHome from '@/components/LayoutHome';

export default function HomePage() {
  const router = useRouter();
  const handleLogout = () => {    
    router.push('/login');
  };
  
  return (
    <LayoutHome>
      <HomeContent onLogout={handleLogout} />
    </LayoutHome>
  );
}