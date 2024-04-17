import { sendToBackground } from '@plasmohq/messaging';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUser, type UserTypeStore } from '~features/user/userSlice';
import { useAppSelector, useAppDispatch } from '~store';
import {
  FREE_MESSAGE_LIMIT,
  PAID_MESSAGE_LIMIT_GPT3,
  PAID_MESSAGE_LIMIT_GPT4,
} from '~utils/constants';
import { API_URL } from '~utils/constants';
import useLoginEventMessages from '~hooks/useLoginEventMessages';
import type { SettingsType } from '~features/settings/settingsSlice';
import { SupportedAIModels } from '~utils/types';

interface UserInfoContextProps {
  user: UserTypeStore;
  login: () => void;
  logout: () => void;
  upgrade: () => void;
  openBillingDashboard: () => void;
  refetchUser: () => void;
  upgradeIsAwaitingLogin: boolean;
  userQueryLimit: number;
  userQueryLimitLeft: number;
  userDailyMessages: number;
  userDailyMessagesGPT4: number;
}

interface UserInfoProviderProps {
  children: React.ReactNode;
}

const UserInfoContext = createContext<UserInfoContextProps>(null);

const UserInfoContextProvider = ({ children }: UserInfoProviderProps) => {
  const dispatch = useAppDispatch();
  const [upgradeIsAwaitingLogin, setUpgradeIsAwaitingLogin] = useState(false);
  const [userDailyMessages, setUserDailyMessages] = useState(0);
  const [userDailyMessagesGPT4, setUserDailyMessagesGPT4] = useState(0);
  const [userQueryLimitLeft, setUserQueryLimitLeft] = useState(0);
  const [userQueryLimit, setUserQueryLimit] = useState(FREE_MESSAGE_LIMIT);

  const user = useAppSelector((state) => state.user);

  const { model }: SettingsType = useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    setUserDailyMessages(user.dailyMessages);
    setUserDailyMessagesGPT4(user.dailyMessagesGPT4);
    if (user.isFree) {
      setUserQueryLimitLeft(FREE_MESSAGE_LIMIT - (user?.dailyMessages || 0));
      setUserQueryLimit(FREE_MESSAGE_LIMIT);
    } else if (model === SupportedAIModels.gpt3) {
      setUserQueryLimitLeft(
        PAID_MESSAGE_LIMIT_GPT3 - (user?.dailyMessages || 0),
      );
      setUserQueryLimit(PAID_MESSAGE_LIMIT_GPT3);
    } else if (model === SupportedAIModels.gpt4) {
      setUserQueryLimitLeft(
        PAID_MESSAGE_LIMIT_GPT4 - (user?.dailyMessagesGPT4 || 0),
      );
      setUserQueryLimit(PAID_MESSAGE_LIMIT_GPT4);
    }
  }, [user, model]);

  const refetchUser = () => {
    dispatch(fetchUser());
    return true;
  };

  useLoginEventMessages(refetchUser);

  const login = async (redirectToCheckout?: boolean) => {
    window.open(
      `${API_URL}/auth?${redirectToCheckout ? 'redirectToCheckout=1' : ''}`,
      '_blank',
    );
  };

  const logout = async () => {
    await sendToBackground({
      name: 'auth',
      body: {
        action: 'logout',
      },
    });
    dispatch(fetchUser());
  };

  const upgrade = () => {
    if (!user.profile) {
      setUpgradeIsAwaitingLogin(true);
      return login(true);
    } else {
      window.open(
        `${process.env.PLASMO_PUBLIC_STRIPE_LINK}?client_reference_id=${
          user.id
        }&prefilled_email=${encodeURIComponent(user.profile.email)}`,
        '_blank',
      );
    }
  };

  // Wait for user to be updated
  useEffect(() => {
    if (upgradeIsAwaitingLogin && user.profile) {
      setUpgradeIsAwaitingLogin(false);
    }
  }, [user, upgradeIsAwaitingLogin]);

  const openBillingDashboard = () => {
    window.open(
      `${
        process.env.PLASMO_PUBLIC_STRIPE_PORTAL_LINK
      }?prefilled_email=${encodeURIComponent(user.profile.email)}`,
      '_blank',
    );
  };

  return (
    <UserInfoContext.Provider
      value={{
        user,
        login,
        logout,
        upgrade,
        refetchUser,
        upgradeIsAwaitingLogin,
        openBillingDashboard,
        userQueryLimitLeft,
        userDailyMessages,
        userDailyMessagesGPT4,
        userQueryLimit,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);

export default UserInfoContextProvider;
