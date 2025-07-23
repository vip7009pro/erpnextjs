'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { login } from '@/services/Api';
import Link from 'next/link';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    'use server'; // Server Action
    const user = formData.get('user') as string;
    const pass = formData.get('pass') as string;
    const response = await login(user, pass);
    return response.data;
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', user);
    formData.append('pass', pass);

    const Jresult = await handleSubmit(formData);
    if (Jresult?.tk_status?.toUpperCase() === 'OK') {
      Swal.fire('Thông báo', 'Chúc mừng bạn, đăng nhập thành công !', 'success');
      localStorage.setItem('publicKey', Jresult.publicKey);
      router.push('/dashboard');
    } else {
      Swal.fire('Thông báo', 'Lỗi: ' + Jresult.message, 'error');
    }
  };
  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });    

    if (res.ok) {
      console.log('Login successful');
      router.push('/dashboard');  
      router.refresh();  
    } else {
      alert('Login failed');
    }
  }; */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-500 to-green-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Nhập</h2>
        <form onSubmit={handleClientSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Đăng Nhập
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}