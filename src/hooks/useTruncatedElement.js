import { useEffect, useState } from 'react';

export const useTruncatedElement = ({ ref, data }) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if(!ref.current) {
      return
    }
    const { offsetHeight, scrollHeight } = ref?.current || {
      offsetHeight: 0,
      scrollHeight: 0,
    };

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref, data]);

  return {
    isTruncated,
  };
};

