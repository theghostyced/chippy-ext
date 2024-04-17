import { sendToBackground } from '@plasmohq/messaging';
import { useCallback, useEffect } from 'react';

export function useErrorHandling() {
  const handleError = useCallback((event) => {
    const { error, filename } = event;
    console.log('useErrorHandling event error', event);

    // Otherwise every error on the page will be sent to sentry.
    // TODO: modify this to only capture for our chrome extension id
    if (filename?.indexOf('chrome-extension://') !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    try {
      sendToBackground({
        name: 'errors',
        body: {
          error: {
            message: error.message,
            stack: error.stack,
            type: 'error',
          },
        },
      }).catch(() => {});
      // Prevent loop
    } catch (err) {
      console.log('Error', err);
    }
  }, []);

  // Disabling this because otherwise we will catch all unhandled exceptions
  // const handleException = useCallback((event: PromiseRejectionEvent) => {
  //   console.log('Caught unhandledrejection', event);
  //   event.preventDefault();
  //   event.stopPropagation();
  //   try {
  //     sendToBackground({
  //       name: 'errors',
  //       body: {
  //         error: {
  //           message: event.reason,
  //           type: 'event',
  //         },
  //       },
  //     }).catch(() => {});
  //     // Prevent loop
  //   } catch (err) {
  //     console.log('Error', err);
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener('error', handleError);
    // window.addEventListener("unhandledrejection", handleException);
    return () => {
      window.removeEventListener('error', handleError);
      // window.removeEventListener("unhandledrejection", handleException);
    };
  }, []);
}
