import React, { useCallback, useEffect, useState } from "react";

interface Position {
  dragX: number;
  dragY: number;
  mouseDownX: number;
  mouseDownY: number;
  dragStartX: number;
  dragStartY: number;
}

const useDraggable = () => {
  const [isDragging, setDragging] = useState(false);
  const [postion, setPosition] = useState<Position>({
    dragX: 0,
    dragY: 80,
    mouseDownX: 0,
    mouseDownY: 0,
    dragStartX: 0,
    dragStartY: 0,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("Mosue down!!!");
    setDragging(true);
    setPosition({
      ...postion,
      dragStartX: postion.dragX,
      dragStartY: postion.dragY,
      mouseDownX: e.pageX,
      mouseDownY: e.pageY,
    });
  };

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onMouseUp = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Mosue up!!!");
    setDragging(false);

    // window.removeEventListener("mousemove", onMouseMove);
    // window.removeEventListener("mouseup", onMouseUp);
  }, []);

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onMouseMove = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(e, isDragging, "Mouse on move");
    if (isDragging) {
      const currentX = e.pageX - postion.mouseDownX;
      const currentY = e.pageY - postion.mouseDownY;
      setPosition({
        ...postion,
        dragX: currentX + postion.dragStartX,
        dragY: currentY + postion.dragStartY,
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log("UseEffect ooo!!!");
  //   window.addEventListener("mousemove", onMouseMove);
  //   window.addEventListener("mouseup", onMouseUp);

  //   return () => {
  //     window.removeEventListener("mousemove", onMouseMove);
  //     window.removeEventListener("mouseup", onMouseUp);
  //   };
  // }, [isDragging]);

  return {
    postion,
    isDragging,
    onMouseMove,
    onMouseDown,
    onMouseUp,
  };
};

export default useDraggable;
