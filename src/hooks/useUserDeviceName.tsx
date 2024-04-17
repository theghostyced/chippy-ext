import { useEffect, useState } from 'react';

export type Device = 'mac' | 'windows';

const useUserDeviceName = () => {
  const [deviceName, setDeviceName] = useState<Device>();

  useEffect(() => {
    if (navigator) {
      const userAgent = navigator.userAgent;

      userAgent.includes('Windows')
        ? setDeviceName('windows')
        : setDeviceName('mac');
    }
  }, []);

  return deviceName;
};

export default useUserDeviceName;
