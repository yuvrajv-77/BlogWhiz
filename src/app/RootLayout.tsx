
import Header from '../components/Header';
import { Outlet } from 'react-router';

import GetStartedProvider from '../contexts/GetStarted';
import GetStartedModal from './GetStartedModal';
import useModal from '../hooks/useModal';
import useAuth from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';



function RootLayout() {
 
  
  return (
    <div className=''>
      <GetStartedProvider>
        <LayoutContent />
      </GetStartedProvider>
    </div>
  );
}

// Create a new component to use the context
function LayoutContent() {
  const {openGetStarted, setOpenGetStarted} = useModal();
  const { user, userDetail } = useAuth();
  const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
  
  useEffect(()=>{
    user && toast.success(`Logged in as ${name}`);
  },[name])
  
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
      <Toaster/>
    </>
  );
}

export default RootLayout;
