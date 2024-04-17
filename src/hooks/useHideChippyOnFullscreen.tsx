import { useEffect } from 'react';

function isElementInFullscreen() {
  const fullscreenElement = document.fullscreenElement;
  return fullscreenElement;
}
// if full page video is playing, hide chippy (e.g. youtube, vimeo)
const useHideChippyOnFullscreen = (setHideChippy: (hide: boolean) => void) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (isElementInFullscreen()) {
        setHideChippy(true);
      } else {
        setHideChippy(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
};

export default useHideChippyOnFullscreen;
