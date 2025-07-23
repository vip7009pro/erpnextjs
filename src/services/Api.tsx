import axios from 'axios';
import { cookies } from 'next/headers';
import { encryptData } from './GlobalFunction';

export async function login(user: string, pass: string) {
  const API_URL = 'http://cmsvina4285.com:5013/api';
  const response = await axios.post(API_URL, {
    command: 'login',
    user,
    pass,
    ctr_cd: '002',
    DATA: {
      CTR_CD: '002',
      COMPANY: 'CMS',
      USER: user,
      PASS: pass,
    },
  });

  const Jresult = response.data;
  if (Jresult?.tk_status?.toUpperCase() === 'OK') {
    (await cookies()).set('token', Jresult.token_content, { path: '/', httpOnly: true });
  }

  return response;
}

export async function checkLogin(publicKey: string) {
  const API_URL = 'http://cmsvina4285.com:5013/api';
  const token = (await cookies()).get('token')?.value;
  const datacheck = {
    CTR_CD: '002',
    token_string: token,
  };
  const encryptedData = await encryptData(publicKey, datacheck);
  const response = await axios.post(API_URL, {
    command: 'checklogin',
    DATA: encryptedData,
  });
  return response;
}

export async function logout() {
  (await cookies()).delete('token');
  return { success: true };
}