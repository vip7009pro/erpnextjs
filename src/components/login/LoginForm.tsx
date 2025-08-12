'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import { login } from '@/services/Api';
import { useDispatch } from 'react-redux';
import { changeUserData } from '@/store/tabSlice';
const cookies = new Cookies();
export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const result = await login(user, pass);   
    if (result.data.tk_status.toUpperCase() === 'OK') {
      Swal.fire('Thông báo', 'Chúc mừng bạn, đăng nhập thành công !', 'success');
      // Lưu token vào cookie ở client-side
      cookies.set('token', result.data.token_content, { path: '/', expires: new Date(Date.now() + 86400000) }); // Hết hạn sau 1 ngày
      localStorage.setItem('publicKey', result.data.publicKey);
      router.push('/dashboard');
      console.log(result.data.userData[0]);
      dispatch(changeUserData(result.data.userData[0]));
    } else {
      Swal.fire('Thông báo', 'Lỗi: ' + result.data.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-500 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Nhập</h2>
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              id="user"
              name="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              name="pass"
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
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}
