'use client';
import LayoutHome from "@/components/LayoutHome";
import LogoutButton from "@/components/logout/LogoutButton";

export default function Dashboard() {
  return (
    <LayoutHome>
      <LogoutButton />
    </LayoutHome>
  );
}