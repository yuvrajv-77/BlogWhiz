import { useContext } from 'react';

import { GetStartedContext } from '../contexts/GetStarted';

export const useModal = () => {
  const context = useContext(GetStartedContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  
  return context;
};

export default useModal;
