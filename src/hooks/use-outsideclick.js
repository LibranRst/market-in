import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler, listenCapture = true) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };

    document.addEventListener('click', handleClick, listenCapture);

    return () =>
      document.removeEventListener('click', handleClick, listenCapture);
  }, [handler, listenCapture]);

  return ref;
};
