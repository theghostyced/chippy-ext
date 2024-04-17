import { sendToBackground } from '@plasmohq/messaging';
import { useRouteError } from 'react-router-dom';

function FallbackRender({ error }) {
  return (
    <div role='alert'>
      <p>Error occurred, the team is on it!</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

const ChippyErrorBoundary = () => {
  const routerError = useRouteError();

  function handleError(error) {
    // keeping around while testing
    console.log('error message', error.message);
    console.log('error stack', error.stack);
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
  }

  handleError(routerError);

  if (!routerError) return <></>;
  return <FallbackRender error={routerError} />;
};

export default ChippyErrorBoundary;
