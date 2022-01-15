import React, { useEffect, useState } from 'react';

export default (ref: React.MutableRefObject<HTMLDivElement | undefined> | null | undefined) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDimensions = () => ({
    width: ref?.current ? ref.current.offsetWidth : 0,
    height: ref?.current ? ref.current.offsetHeight : 0,
  });

  useEffect(() => {
    const refreshDimensions = () => setDimensions(getDimensions());

    if (ref?.current) refreshDimensions();

    window.addEventListener('resize', refreshDimensions);

    return () => {
      window.removeEventListener('resize', refreshDimensions);
    };
  }, [ref]);

  return dimensions;
};
