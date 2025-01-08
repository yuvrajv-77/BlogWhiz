
import Header from '../components/Header';
import { Link, Outlet, useLocation } from 'react-router';

import GetStartedProvider from '../contexts/GetStarted';
import GetStartedModal from './GetStartedModal';
import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { PiNotePencilLight } from 'react-icons/pi';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { RxPencil2 } from 'react-icons/rx';



function RootLayout() {
 
  
  return (
    <div className='relative'>
      <GetStartedProvider>
        <LayoutContent />
      </GetStartedProvider>
    </div>
  );
}

// Create a new component to use the context
function LayoutContent() {
  const location = useLocation();
  const { openGetStarted, setOpenGetStarted } = useModal();
  const { user, userDetail, error } = useAuth();
  const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
  
  useEffect(()=>{
    if(error) toast.error(error?.message);
  },[error])
 
  useEffect(()=>{
    if(error) toast.error(error?.message);
    user && toast.success(`Logged in as ${name}`);
  },[name])
  
  const showFloatingButton = location.pathname !== '/admin/form';
  return (
    <>
      <Header />
      <Outlet />
      {openGetStarted && (
        <>
          <div className="fixed backdrop-blur-lg inset-0 z-10" onClick={() => setOpenGetStarted(false)}></div>
          <GetStartedModal />
        </>
      )}
      {showFloatingButton && (
        <Link to={'/admin/form'} onClick={() => { if(!user) setOpenGetStarted(true); }}  className='fixed md:hidden bottom-6 right-6 z-20 size-14 bg-black rounded-full flex items-center justify-center cursor-pointer active:bg-gray-800 transform transition-all active:scale-95 shadow-lg hover:shadow-xl'>
          <RxPencil2  color='white' size={20}/>
        </Link>
      )}
      <Toaster/>
    </>
  );
}

export default RootLayout;
