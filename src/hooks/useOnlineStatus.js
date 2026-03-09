import { useState, useEffect } from 'react';
import { debug } from '../config/constants.js';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      debug.log('🌐 Connection restored');
      setIsOnline(true);
    };
    const handleOffline = () => {
      debug.warn('📡 Connection lost');
      setIsOnline(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
