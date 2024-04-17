import '~css/_1_base/injected.css';
import '~assets/css/supreme.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { PersistGate } from '@plasmohq/redux-persist/integration/react';
import cssText from 'data-text:~css/global.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import React from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { Provider } from 'react-redux';
import AppRoutes from '~components/AppRoutes';
import SideBar from '~components/common/sidebar/Sidebar';
import { useErrorHandling } from '~hooks/useErrorHandling';
import ConversationsProvider from '~providers/Conversations';
import SidebarContextProvider from '~providers/SidebarProvider';
import ThemeProvider from '~providers/ThemeProvider';
import UserInfoContextProvider from '~providers/UserInfoProvider';
import { persistor, store } from '~store';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

const style = document.createElement('style');

const styleCache = createCache({
  key: 'chpy-emo',
  prepend: true,
  container: style,
});

export const getStyle: PlasmoGetStyle = () => {
  style.textContent = cssText;
  return style;
};

export const getShadowHostId = () => 'chippy-sidebar';

const Page = () => {
  useErrorHandling();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={styleCache}>
          <UserInfoContextProvider>
            <HotkeysProvider>
              <ThemeProvider>
                <ConversationsProvider>
                  <SidebarContextProvider>
                    <SideBar>
                      <AppRoutes />
                    </SideBar>
                  </SidebarContextProvider>
                </ConversationsProvider>
              </ThemeProvider>
            </HotkeysProvider>
          </UserInfoContextProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default Page;
