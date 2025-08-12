'use client';
import LayoutHome from "@/components/LayoutHome";
import { checkLogin } from "@/services/Api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeUserData } from "@/store/tabSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Dashboard() {
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
    <LayoutHome>
      <div>{user?.EMPL_NO}{user?.MIDLAST_NAME} {user?.FIRST_NAME} </div>
    </LayoutHome>
  );
}