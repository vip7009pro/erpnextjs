import './globals.css';
import { store } from '@/store';
import { Provider } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
