'use client';
import './globals.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkLogin } from '@/services/Api';
import { changeUserData } from '@/store/tabSlice';
import { useEffect } from 'react';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.glb.userData);
  const router = useRouter();
  const checkUserLogin = async () => {
    const result = await checkLogin(localStorage.getItem('publicKey') || '');
    if(result.data.tk_status.toUpperCase() === 'OK'){
      dispatch(changeUserData(result.data.data));   
    }
    else{
      router.push('/login');
    }
  };
  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <html lang="vi">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
