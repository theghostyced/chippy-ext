import {
  eventFromException,
  eventFromMessage,
  defaultStackParser,
} from '@sentry/browser';

const getAppVersion = () => {
  const manifestData = chrome.runtime.getManifest();
  return manifestData.version;
};

function parseDSN(dsn: string) {
  const [_, publicKeyWithPath] = dsn.split('https://');
  const [publicKey, hostWithPath] = publicKeyWithPath.split('@');

  const [host, projectId] = hostWithPath.split('/');

  return {
    host,
    projectId,
    publicKey,
  };
}

async function _getEventFromError(exception: Error) {
  return eventFromException(defaultStackParser, exception, null, true);
}

async function _getEventFromMessage(exception: string) {
  return eventFromMessage(defaultStackParser, exception);
}

export async function captureException(exception: Error | string) {
  if (!process.env.PLASMO_PUBLIC_SENTRY_DSN) {
    console.log('sentry not configured');
    return 'Sentry not configured';
  }
  const keys = parseDSN(process.env.PLASMO_PUBLIC_SENTRY_DSN);
  const sentryAuth = [
    'Sentry sentry_version=7',
    'sentry_client=fetch',
    `sentry_key=${keys.publicKey}`,
  ];
  const event =
    typeof exception === 'string'
      ? await _getEventFromMessage(exception)
      : await _getEventFromError(exception);
  const params = event;
  params.environment = process.env.PLASMO_PUBLIC_ENV || 'development';
  params.release = getAppVersion();

  try {
    const response = await fetch(
      `https://${keys.host}/api/${keys.projectId}/store/`,
      {
        headers: {
          'X-Sentry-Auth': sentryAuth.join(','),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(params),
      },
    );
    return response.json();
  } catch (error) {
    console.log('Error when logging to sentry:', error);
    return error;
  }
}
