'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './logout/LogoutButton';
import { IoMdMenu } from 'react-icons/io';
import { MdWarehouse, MdSell, MdLock, MdNotifications, MdInput, MdOutput, MdFormatQuote, MdShoppingCart, MdPassword, MdSecurity, MdMenuBook, MdOutlineFormatAlignCenter } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaDatabase } from 'react-icons/fa';
import { DiMsqlServer } from 'react-icons/di';
import { SiReactquery } from 'react-icons/si';
import { TbCirclesRelation } from 'react-icons/tb';
import { CgWebsite } from 'react-icons/cg';
interface LayoutHomeProps {
  children: React.ReactNode;
}
const menuItems = [
  {
    name: 'Dashboard',
    icon: '🏠',
    path: '/dashboard',
  },
  {
    name: 'ERP',
    icon: <MdWarehouse />,
    path: '/erp',
    children: [
      {
        name: 'Quản lý kho',
        icon: <MdWarehouse />,
        path: '/erp/warehouse',
        children: [
          { name: 'Nhập kho', icon: <MdInput />, path: '/erp/warehouse/import' },
          { name: 'Xuất kho', icon: <MdOutput />, path: '/erp/warehouse/export' },
        ],
      },
      {
        name: 'Quản lý bán hàng',
        icon: <MdSell />,
        path: '/erp/sales',
        children: [
          { name: 'Báo giá', icon: <MdFormatQuote />, path: '/erp/sales/quote' },
          { name: 'Đơn hàng', icon: <MdShoppingCart />, path: '/erp/sales/order' },
        ],
      },
    ],
  },
  {
    name: 'No Code - Low Code',
    icon: <MdSell />,
    path: '/nocodelowcode',
    children: [
      { name: 'DB Manager', icon: <FaDatabase color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/dbmanager' },
      { name: 'SQL', icon: <DiMsqlServer color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/sql' },
      { name: 'Query Manager', icon: <SiReactquery color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/querymanager' },
      { name: 'Menu Manager', icon: <MdMenuBook color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/menumanager' },
      { name: 'Form Manager', icon: <MdOutlineFormatAlignCenter color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/formmanager' },
      { name: 'Relationship Manager', icon: <TbCirclesRelation color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/relationshipmanager' },
      { name: 'Pages Manager', icon: <CgWebsite color={`#${Math.floor(Math.random()*16777215).toString(16)}`} />, path: '/nocodelowcode/pagesmanager' },     
    ],
  },
  {
    name: 'Profile',
    icon: '👤',
    path: '/profile',
  },
  {
    name: 'Settings',
    icon: <MdLock />,
    path: '/settings',
    children: [
      {
        name: 'Bảo mật',
        icon: <MdSecurity />,
        path: '/settings/security',
        children: [
          { name: 'Mật khẩu', icon: <MdPassword />, path: '/settings/security/password' },
          { name: 'Xác thực 2 lớp', icon: <MdLock />, path: '/settings/security/2fa' },
        ],
      },
      { name: 'Thông báo', icon: <MdNotifications />, path: '/settings/notifications' },
    ],
  },
];
export default function LayoutHome({ children }: LayoutHomeProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  const [activeMenu, setActiveMenu] = React.useState<string>('');
  const user = useSelector((state: any) => state.glb.userData);

  // Đệ quy render menu nhiều cấp
  function SidebarMenuItem({ item, openMenus, setOpenMenus, activeMenu, setActiveMenu, level = 0 }: { item: any; openMenus: string[]; setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>; activeMenu: string; setActiveMenu: React.Dispatch<React.SetStateAction<string>>; level?: number }) {
    const hasChildren = !!item.children && item.children.length > 0;
    const isOpen = openMenus.includes(item.path);
    const handleClick = (e: React.MouseEvent) => {
      setActiveMenu(item.path);
      if (hasChildren) {
        e.preventDefault();
        setOpenMenus((prev: string[]) => (isOpen ? prev.filter((p) => p !== item.path) : [...prev, item.path]));
      }
    };
    return (
      <div className={`relative ${level > 0 ? 'ml-4' : ''}`}>
        <Link
          href={item.path}
          onClick={handleClick}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm w-full transition font-medium ${hasChildren ? 'cursor-pointer' : ''} 
            ${activeMenu === item.path ? 'bg-blue-200 text-blue-800 font-bold' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
          style={{ paddingLeft: `${level * 5 + 12}px` }}
        >
          {/* icon */}
          {item.icon && (typeof item.icon === 'string' ? <span className='text-sm'>{item.icon}</span> : <span className='text-base flex items-center'>{item.icon}</span>)}
          {item.name}
          {hasChildren && (
            <svg className={`ml-auto w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
            </svg>
          )}
        </Link>
        {hasChildren && isOpen && (
          <div className='flex flex-col gap-1 bg-white rounded-bl-lg rounded-br-lg py-1'>
            {item.children.map((sub: any) => (
              <SidebarMenuItem key={sub.path} item={sub} openMenus={openMenus} setOpenMenus={setOpenMenus} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      {/* Click outside to close sidebar on mobile (transparent, no bg) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Sidebar - offcanvas cho cả desktop và mobile */}
      <aside
        className={`bg-white shadow-lg flex flex-col justify-between transition-transform duration-500 z-30
        fixed h-full top-0 left-0 w-60
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ maxWidth: 240, minWidth: 0 }}
      >
        <div>
          <div className='flex justify-center items-center gap-2 px-1 py-0'>
            <Image src='/companylogo.png' alt='company logo' width={80} height={80} className='w-auto h-auto' priority={false}/>
            {/* Close button cho mọi màn hình */}
            <button
              className="ml-auto p-2 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
              aria-label="Đóng menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
          </div>
          <nav className='mt-1 flex flex-col gap-2 px-0.5'>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.path}
                item={item}
                openMenus={openMenus}
                setOpenMenus={setOpenMenus}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            ))}
          </nav>
        </div>
        <div className='px-2 py-2'>
          <LogoutButton />
        </div>
      </aside>
      {/* Main content dịch sang phải khi sidebar mở trên desktop */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ${sidebarOpen ? 'md:ml-60' : ''}`}>
        {/* Navbar */}
        <header className='h-6 bg-white shadow flex items-center px-2 md:px-2 justify-between'>
          <h1 className='flex items-center gap-1 text-base font-semibold text-gray-800'>
            {!sidebarOpen && <button onClick={() => setSidebarOpen((prev) => !prev)}>
              <IoMdMenu />
            </button>}           
        
          </h1>
          <div className='flex items-center gap-4'>
            <span className='text-gray-600 text-sm'>Xin chào, {user.EMPL_NO}</span>
            <Image src='https://cmsvina4285.com/Picture_NS/NS_NHU1903.jpg' alt='window icon' width={24} height={24} className='w-6 h-6 rounded-full border' />
          </div>
        </header>
        <main className='flex-1 p-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
