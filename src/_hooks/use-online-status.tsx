// hooks/useOnlineStatus.ts
import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    updateStatus();

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  console.log(isOnline)

  return isOnline;
}
