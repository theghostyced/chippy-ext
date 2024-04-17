import React, { type RefObject } from 'react';

const useDetectBottom = (ref: RefObject<HTMLElement>): boolean => {
  if (ref.current) {
    const threshold = 100;
    return (
      ref.current.scrollHeight - ref.current.scrollTop <=
      ref.current.clientHeight + threshold
    );
  }

  return false;
};

export default useDetectBottom;
