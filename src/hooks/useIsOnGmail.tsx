import { useState, useEffect } from 'react';
import { useConversations } from '~providers/Conversations';
import { useSidebarContext } from '~providers/SidebarProvider';

function useIsOnGmail() {
  const [isOnGmail, setIsOnGmail] = useState(false);
  const [loading, setLoading] = useState(true);

  const { close } = useSidebarContext();
  const { startNewConversation } = useConversations();

  useEffect(() => {
    const initialCheckURL = () => {
      const isCurrentlyOnGmail = /^https:\/\/mail\.google\.com\/.*/.test(
        document.location.href,
      );
      setIsOnGmail(isCurrentlyOnGmail);
      setLoading(false);
    };

    const checkURLChange = () => {
      const isCurrentlyOnGmail = /^https:\/\/mail\.google\.com\/.*/.test(
        document.location.href,
      );
      setIsOnGmail(isCurrentlyOnGmail);
      setLoading(false);

      if (isCurrentlyOnGmail) {
        startNewConversation();
        close();
      }
    };

    // check on component mount
    initialCheckURL();

    // then check on url changes
    window.addEventListener('popstate', checkURLChange);

    return () => {
      window.removeEventListener('popstate', checkURLChange);
    };
  }, [startNewConversation, close]);

  return [isOnGmail, loading];
}

export default useIsOnGmail;
