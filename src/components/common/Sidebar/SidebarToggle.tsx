import styled from "@emotion/styled";
import { useMessage } from "@plasmohq/messaging/hook";
import React, { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import DarkIcon from "~components/svgs/ChippyIcon/DarkIcon";
import GlossyIcon from "~components/svgs/ChippyIcon/GlossyIcon";
import LightIcon from "~components/svgs/ChippyIcon/LightIcon";
import Window98Icon from "~components/svgs/ChippyIcon/Window98Icon";
import useDraggable from "~hooks/useDraggable";
import useUserDeviceName from "~hooks/useUserDeviceName";
import { useSidebarContext } from "~providers/SidebarProvider";
import { useTheme } from "~providers/ThemeProvider";
import { useAppSelector } from "~store";
import { BackgroundTypes } from "~utils/types";
import { UserStatus } from "~utils/types";

const DraggableContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  padding: var(--chpy-spacing);
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
`;

const DraggableRelativeContainer = styled.div`
  position: relative;
`;

const SidebarToggle = () => {
  const { toggle: originalToggle } = useSidebarContext();
  const { postion, onMouseDown, isDragging, onMouseMove, onMouseUp } =
    useDraggable();
  const { theme } = useTheme();
  const { userStatus, showChippyToggle } = useAppSelector(
    (state) => state.settings
  );
  const [currentPosition, setCurrentPosition] = useState({
    xRate: 0,
    yRate: 80,
  });
  const deviceName = useUserDeviceName();

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Check if 'J' key is pressed and either 'Meta' (Command on Mac) or 'Control' (Control on Windows) is also pressed
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      toggle();
      e.preventDefault();
    }
  };

  const toggle = () => {
    originalToggle();
    // if onboarding, send message to website
    const url = new URL(window.location.href);
    if (userStatus !== UserStatus.complete && url.hostname === "chippyai.com") {
      window.postMessage({ from: "chippy", status: UserStatus.theme }, "*");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle]);

  // if icon is clicked, message from background is sent to active tab
  const toggleChippy = async (request) => {
    if (request.name === BackgroundTypes.icon) {
      toggle();
    }
  };
  useMessage(toggleChippy);

  if (!showChippyToggle) return null;

  return (
    <DraggableRelativeContainer>
      <DraggableContainer className="draggable-container">
        {/* <Draggable
          position={{
            x: 0,
            y: -currentPosition.yRate,
          }}
          onDrag={onDrag}
        > */}
        <button
          className="sidebar__toggle"
          onClick={toggle}
          // style={{
          //   // bottom: `${postion.dragY}px`,
          //   transform: `translate(0px, ${postion.dragY}px)`,
          //   cursor: isDragging ? "grabbing" : "grab",
          // }}
          type="button"
          // onMouseDown={onMouseDown}
          // onMouseMove={onMouseMove}
          // onMouseUp={onMouseUp}
          // onMouseLeave={onMouseUp}
        >
          {theme === "window98" && <Window98Icon />}
          {theme === "glossy" && <GlossyIcon />}
          {theme === "dark" && <DarkIcon />}
          {theme === "light" && <LightIcon />}

          <span className="sidebar__toggle-tooltip">
            Open ({deviceName === "mac" ? "⌘+J" : "Ctrl+J"})
          </span>
        </button>
        {/* </Draggable> */}
      </DraggableContainer>
    </DraggableRelativeContainer>
  );
};

export default SidebarToggle;
