import axios from 'axios';
import { encryptData } from './GlobalFunction';
import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.withCredentials = true;
const API_URL = 'http://cmsvina4285.com:3007/api';

export const getCtrCd = () => {  
  return '002';
}
export async function login(user: string, pass: string) {
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
  return response;
}

export async function checkLogin(publicKey: string) {
  const token = cookies.get('token');
  const datacheck = {
    CTR_CD: '002',
    token_string: token,
    COMPANY: 'CMS',
  };
  const encryptedData = await encryptData(publicKey, datacheck);
  const response = await axios.post(API_URL, {
    command: 'checklogin',
    DATA: encryptedData,
  });
  return response;
}

export async function logout() {
  cookies.remove('token');
  return { success: true };
}

export async function generalQuery(command: string, queryData: any) {
  const CURRENT_API_URL = API_URL;
  // console.log('API URL', CURRENT_API_URL);
  const publicKey = localStorage.getItem("publicKey");
  
  const DATA = {
    ...queryData,
    token_string: cookies.get("token"),
    CTR_CD: '002',
    COMPANY: 'CMS',
  };
  //console.log("publicKey",publicKey)
  const encryptedData = await encryptData(publicKey??"",DATA);
  const data = await axios.post(CURRENT_API_URL, {
    command: command,
    DATA: encryptedData,
  });
  return data;
}
export async function uploadQuery(
  file: any,
  filename: string,
  uploadfoldername: string,
  filenamelist?: string[]
) {
  const formData = new FormData();
  formData.append("uploadedfile", file);
  formData.append("filename", filename);
  formData.append("uploadfoldername", uploadfoldername);
  formData.append("token_string", cookies.get("token")?.value);
  formData.append("CTR_CD", '002');
  if (filenamelist)
    formData.append("newfilenamelist", JSON.stringify(filenamelist));
  //console.log("filenamelist", filenamelist);
  //console.log("formData", formData);
  //console.log("token", cookies.get("token"));
  const data = await axios.post(API_URL, formData);
  return data;
}