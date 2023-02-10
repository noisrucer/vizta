// https://betterprogramming.pub/usebreakpoint-hook-get-media-query-breakpoints-in-react-3f1779b73568
import {useState, useEffect} from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width) => {
  if (width < 576) {
    return 'xs';
  } else if (width >= 768 && width < 992) {
    return 'sm';
  } else if (width >= 992 && width < 1200) {
    return 'md';
  } else if (width >= 1200) {
    return 'lg';
  }
};

const useBreakpoints = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}
export default useBreakpoints;