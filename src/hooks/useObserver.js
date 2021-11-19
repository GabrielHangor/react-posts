import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, receivedCallback) => {
  const observer = useRef();

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    const callback = (entries) => {
      if (entries[0].isIntersecting && canLoad) {
        receivedCallback();
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
