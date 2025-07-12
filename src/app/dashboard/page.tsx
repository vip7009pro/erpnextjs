'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeTab, openTab, setActiveTab } from '@/store/tabSlice';
import UserTab from './tabs/User';
import ReportTab from './tabs/Report';
import { JSX } from 'react';

const componentMap: Record<string, JSX.Element> = {
  Dashboard: <div>Chào mừng!</div>,
  User: <UserTab />,
  Report: <ReportTab />,
};

export default function DashboardPage() {
  const { tabs, activeKey } = useSelector((state: RootState) => state.tab);
  const dispatch = useDispatch();

  const handleOpenTab = (key: string, title: string, component: string) => {
    dispatch(openTab({ key, title, component }));
  };

  return (
    <div className="flex">
      {/* Sidebar menu */}
      <aside className="w-48 bg-gray-100 p-2">
        <button onClick={() => handleOpenTab('user', 'Người dùng', 'User')}>Người dùng</button>
        <button onClick={() => handleOpenTab('report', 'Báo cáo', 'Report')}>Báo cáo</button>
      </aside>

      {/* Tab area */}
      <main className="flex-1">
        {/* Tab headers */}
        <div className="flex space-x-2 border-b">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`p-2 cursor-pointer ${
                activeKey === tab.key ? 'bg-white border-t border-l border-r' : 'bg-gray-200'
              }`}
              onClick={() => dispatch(setActiveTab(tab.key))}
            >
              {tab.title}
              {tab.key !== 'dashboard' && (
                <button className="ml-2 text-red-500" onClick={() => dispatch(closeTab(tab.key))}>
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4">
          {tabs.map(
            (tab) =>
              tab.key === activeKey && (
                <div key={tab.key}>{componentMap[tab.component] || <div>Không tìm thấy</div>}</div>
              )
          )}
        </div>
      </main>
    </div>
  );
}
