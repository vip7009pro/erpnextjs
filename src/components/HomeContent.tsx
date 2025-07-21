'use client';

interface HomeContentProps {
  onLogout: () => void;
}

export default function HomeContent({ onLogout }: HomeContentProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Welcome to Home Page</h1>
      <p className="mb-6">You are logged in!</p>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </>
  );
}