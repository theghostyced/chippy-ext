import { useEffect, useState } from 'react';

export function useTextSelection() {
  // TODO: Delete commented out code if we decide to only use selectedText
  // to trigger clippy
  // const [isMouseDown, setIsMouseDown] = useState(false);
  // const [isMouseUp, setIsMouseUp] = useState(false);
  const [selectedText, setSelectedText] = useState<string | undefined>();
  useEffect(() => {
    const handleMouseUp = () => {
      // setIsMouseDown(false);
      // setIsMouseUp(true);
      setTimeout(() => {
        const text = window.getSelection().toString().trim();
        setSelectedText(text);
      }, 0);
    };

    // const handleMouseDown = () => {
    // setSelectedText(undefined);
    // setIsMouseDown(true);
    // setIsMouseUp(false);
    // };

    // Note: adding the mouse down event to the document
    // causes issues with the shadow dom onClick events
    // adding it to the body seems to fix the issue
    const element = document.querySelector('body');

    element.addEventListener('mouseup', handleMouseUp);
    // element.addEventListener('mousedown', handleMouseDown);
    return () => {
      element.removeEventListener('mouseup', handleMouseUp);
      // element.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return {
    // isMouseDown,
    // isMouseUp,
    selectedText,
  };
}
