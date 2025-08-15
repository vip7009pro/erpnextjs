'use client';
import './globals.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
