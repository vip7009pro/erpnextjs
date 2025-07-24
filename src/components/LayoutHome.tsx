import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LayoutHomeProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Dashboard", icon: "🏠", path: "/dashboard" },
  { name: "ERP", icon: "⛺", path: "/erp" },
  { name: "Profile", icon: "👤", path: "/profile" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

export default function LayoutHome({ children }: LayoutHomeProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className={`bg-white shadow-lg flex flex-col justify-between transition-all duration-300 z-30
        ${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'}
        fixed md:static h-full md:h-auto top-0 left-0`
      }>

        <div>
          <div className="flex items-center gap-2 px-2.5 py-2.5 border-b">
            <Image src="/globe.svg" alt="Logo" width={20} height={20} className="w-5 h-5 rounded-full" />
            <span className="text-xl font-bold text-blue-600">ERP NextJS</span>
          </div>
          <nav className="mt-1 flex flex-col gap-2 px-4">
            {menuItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-4 py-2 border-t">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25m0 3.75H8.25m7.5 0v7.5A2.25 2.25 0 0113.5 19.5h-3A2.25 2.25 0 018.25 16.5V9m7.5 0H8.25" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-12 bg-white shadow flex items-center px-4 md:px-8 justify-between">
            {/* Hamburger menu */}
          
            <button
              className="md:hidden p-2 mr-2 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          <h1 className="text-xl font-semibold text-gray-800">Trang chủ</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Xin chào, User</span>
            <Image src="/window.svg" alt="Avatar" width={32} height={32} className="w-8 h-8 rounded-full border" />
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
