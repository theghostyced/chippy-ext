import Tooltip from '../Tooltip';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CollapseSidebar from '~components/svgs/CollapseSidebar';
import NewChat from '~components/svgs/NewChat';
import { useConversations } from '~providers/Conversations';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useTheme } from '~providers/ThemeProvider';

const SidebarHeader = () => {
  const [conversationId, setConversationId] = useState<string | undefined>();
  const { startNewConversation } = useConversations();
  const navigate = useNavigate();

  const createNewConversion = () => {
    startNewConversation();
    navigate('/conversations/current');
  };

  const { close } = useSidebarContext();
  const location = useLocation();
  const { pathname } = location;
  const { theme } = useTheme();
  // const manifestData = chrome.runtime.getManifest();

  const className = `chpy-theme-${theme}`;

  useEffect(() => {
    if (pathname) {
      const [_, __, id] = pathname.split('/');
      setConversationId(id);
    }
  }, [pathname]);

  // const showBackButton =
  //   conversationId &&
  //   (conversationId  conversationId !== 'history');
  return (
    <div className='sidebar__header'>
      <div className='wrapper flex justify-between align-center'>
        <p className='title'>
          <svg
            width='32'
            height='12'
            viewBox='0 0 32 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Chippy logo</title>
            <path
              d='M9.76944 2.88543C9.04997 2.88543 8.47219 3.18085 8.0884 3.7419V0.965953C8.0884 0.602554 7.79297 0.307129 7.42958 0.307129C7.06618 0.307129 6.77075 0.602554 6.77075 0.965953V8.10268C6.77075 8.46608 7.06618 8.76151 7.42958 8.76151C7.79297 8.76151 8.0884 8.46608 8.0884 8.10268V5.54059C8.0884 5.07419 8.2186 4.68674 8.46435 4.42059C8.68814 4.1785 9.00552 4.04569 9.35899 4.04569C9.7365 4.04569 10.0011 4.13981 10.1684 4.33327C10.3326 4.5236 10.4126 4.8185 10.4126 5.23523V8.09693C10.4126 8.46347 10.7106 8.76151 11.0772 8.76151C11.4437 8.76151 11.7417 8.46347 11.7417 8.09693V4.96386C11.7417 4.28569 11.5687 3.76229 11.2272 3.40883C10.8915 3.06112 10.4011 2.88491 9.76997 2.88491L9.76944 2.88543Z'
              fill='currentColor'
            />
            <path
              d='M13.4828 2.9989C13.1194 2.9989 12.824 3.29433 12.824 3.65773V8.10322C12.824 8.46661 13.1194 8.76204 13.4828 8.76204C13.8462 8.76204 14.1416 8.46661 14.1416 8.10322V3.65773C14.1416 3.29433 13.8462 2.9989 13.4828 2.9989Z'
              fill='currentColor'
            />
            <path
              d='M5.34745 6.07492C5.03373 6.07492 4.74928 6.31178 4.65569 6.65061C4.55529 7.01401 4.37909 7.27649 4.11608 7.4527C3.85778 7.62629 3.5085 7.71414 3.07922 7.71414C2.51451 7.71414 2.07634 7.54211 1.77673 7.20224C1.49124 6.8791 1.34065 6.40224 1.34065 5.82342V3.59544C1.34065 3.01087 1.49229 2.53034 1.77935 2.20668C2.08157 1.86577 2.52654 1.69322 3.1017 1.69322C3.51895 1.69322 3.85987 1.78734 4.11556 1.97244C4.36131 2.15021 4.53909 2.42159 4.64471 2.77871C4.74301 3.11021 5.01804 3.33296 5.32967 3.33296C5.52627 3.33296 5.71399 3.24302 5.83163 3.09296C5.93987 2.95492 5.97595 2.78499 5.9336 2.61453C5.7736 1.96982 5.4536 1.46106 4.98353 1.10237C4.48784 0.724332 3.84732 0.532959 3.07922 0.532959C2.16052 0.532959 1.39085 0.802763 0.853333 1.31361C0.294902 1.84433 0 2.62551 0 3.57296V5.8459C0 6.79701 0.295948 7.5761 0.856471 8.10002C1.39869 8.60668 2.18719 8.8744 3.13621 8.8744C3.87399 8.8744 4.49621 8.69191 4.98458 8.33165C5.48026 7.96616 5.80601 7.44276 5.95294 6.77505C5.99007 6.60721 5.95085 6.44146 5.84314 6.3076C5.72601 6.16172 5.54092 6.07492 5.34745 6.07492Z'
              fill='currentColor'
            />
            <path
              d='M24.283 2.88541C23.5818 2.88541 23.0354 3.13378 22.6908 3.60541C22.6641 3.26659 22.3797 2.99887 22.0341 2.99887C21.6707 2.99887 21.3752 3.2943 21.3752 3.6577V10.3646C21.3752 10.728 21.6707 11.0235 22.0341 11.0235C22.3975 11.0235 22.6929 10.728 22.6929 10.3646V8.15809C23.0443 8.62763 23.5901 8.87443 24.283 8.87443C24.9758 8.87443 25.506 8.64593 25.907 8.21352C26.3284 7.75861 26.5512 7.09247 26.5512 6.28672V5.4726C26.5512 4.66685 26.3284 4.0007 25.907 3.5458C25.506 3.11338 24.9444 2.88489 24.283 2.88489V2.88541ZM25.2111 5.50659V6.25273C25.2111 6.71652 25.1096 7.07783 24.9088 7.32672C24.7023 7.58345 24.3917 7.71365 23.986 7.71365C23.5802 7.71365 23.2681 7.5824 23.0422 7.33352C22.8137 7.08149 22.6929 6.71548 22.6929 6.27521V5.52907C22.6929 5.03966 22.8084 4.66319 23.0354 4.40959C23.2518 4.16803 23.564 4.04567 23.963 4.04567C24.3619 4.04567 24.6966 4.17587 24.9062 4.43312C25.1081 4.68097 25.2105 5.04227 25.2105 5.50659H25.2111Z'
              fill='currentColor'
            />
            <path
              d='M13.4829 0.646484C13.2481 0.646484 13.0348 0.721256 12.8832 0.857203C12.7274 0.996288 12.6416 1.19394 12.6416 1.41354C12.6416 1.85799 12.9956 2.18008 13.4829 2.18008C13.7245 2.18008 13.9336 2.10531 14.0879 1.96465C14.2406 1.82505 14.3242 1.62949 14.3242 1.41354C14.3242 1.1976 14.24 0.995765 14.0874 0.857726C13.9347 0.719687 13.7255 0.647007 13.4829 0.647007V0.646484Z'
              fill='currentColor'
            />
            <path
              d='M31.8192 3.28335C31.7016 3.10505 31.5039 2.9989 31.2901 2.9989C31.0344 2.9989 30.8048 3.15106 30.706 3.38688L29.3721 6.56073L28.0634 3.40152C27.962 3.15733 27.7256 2.9989 27.461 2.9989C27.2409 2.9989 27.037 3.10871 26.9162 3.29276C26.7954 3.47681 26.7755 3.7074 26.8629 3.90975L28.7149 8.18792L27.8255 10.2732C27.7601 10.4269 27.7601 10.5958 27.826 10.749C27.8919 10.9022 28.0148 11.0188 28.1711 11.0768C28.2401 11.1024 28.3112 11.1145 28.3813 11.1145C28.6166 11.1145 28.8388 10.9764 28.9366 10.7474L31.8725 3.88152C31.9567 3.68544 31.9363 3.46165 31.8187 3.28335H31.8192Z'
              fill='currentColor'
            />
            <path
              d='M18.207 2.88541C17.5059 2.88541 16.9594 3.13378 16.6149 3.60541C16.5882 3.26659 16.3038 2.99887 15.9581 2.99887C15.5947 2.99887 15.2993 3.2943 15.2993 3.6577V10.3646C15.2993 10.728 15.5947 11.0235 15.9581 11.0235C16.3215 11.0235 16.617 10.728 16.617 10.3646V8.15809C16.9683 8.62763 17.5142 8.87443 18.207 8.87443C18.8998 8.87443 19.43 8.64593 19.8311 8.21352C20.2525 7.75861 20.4753 7.09247 20.4753 6.28672V5.4726C20.4753 4.66685 20.2525 4.0007 19.8311 3.5458C19.43 3.11338 18.8685 2.88489 18.207 2.88489V2.88541ZM19.1351 5.50659V6.25273C19.1351 6.71652 19.0337 7.07783 18.8334 7.32672C18.6269 7.58345 18.3163 7.71365 17.9106 7.71365C17.5048 7.71365 17.1926 7.5824 16.9668 7.33352C16.7383 7.08149 16.6175 6.71548 16.6175 6.27521V5.52907C16.6175 5.04018 16.733 4.66319 16.9605 4.40959C17.177 4.16803 17.4891 4.04567 17.8881 4.04567C18.287 4.04567 18.6217 4.17587 18.8313 4.43312C19.0332 4.68097 19.1357 5.04227 19.1357 5.50659H19.1351Z'
              fill='currentColor'
            />
          </svg>
          {/* {manifestData.version} */}
        </p>
        {/* {showBackButton ? (
          <button
            onClick={() => navigate('/conversations/history')}
            className="round visible"
          >
            <ChevronBack />
          </button>
        ) : (
          <p className="title">Chippy</p>
        )} */}
        <nav
          className={`sidebar__header__nav flex justify-center align-center ${className}`}
        >
          <Link
            to='/conversations/current'
            className={
              conversationId === 'current'
                ? 'active hover-active'
                : 'hover-active'
            }
          >
            Active
          </Link>
          <Link
            to='/conversations/history'
            className={
              conversationId && conversationId !== 'current'
                ? 'active hover-history'
                : 'hover-history'
            }
          >
            History
          </Link>
          <Link
            to='/themes'
            className={
              pathname === '/themes' ? 'active hover-themes' : 'hover-themes'
            }
          >
            Themes
          </Link>
          <Link
            to='/settings'
            className={
              pathname === '/settings'
                ? 'active hover-settings'
                : 'hover-settings'
            }
          >
            Settings
          </Link>
        </nav>
        <div className={`sidebar__header__utilities flex ${className}`}>
          <Tooltip.Bottom text='New Chat'>
            <button
              onClick={() => createNewConversion()}
              type='button'
              className='new-chat-button'
            >
              <NewChat />
            </button>
          </Tooltip.Bottom>
          <button onClick={() => close()} className='round' type='button'>
            <CollapseSidebar />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
