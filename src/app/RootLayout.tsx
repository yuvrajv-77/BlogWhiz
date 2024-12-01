
import Header from '../components/Header';
import { Outlet } from 'react-router';

import GetStartedProvider from '../contexts/GetStarted';
import GetStartedModal from './GetStartedModal';
import useModal from '../hooks/useModal';



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
    </>
  );
}

export default RootLayout;
