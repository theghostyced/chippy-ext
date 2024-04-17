import {
  Wrapper,
  Item,
  SelectPopupWrapper,
  SelectPopupContainer,
  Button,
} from './style';
import React, { useState } from 'react';
import { Divider } from '~components/common/Divider';
import CheckboxInput from '~components/common/Form/CheckboxInput';
import {
  MessageInputContainer,
  SelectComponent,
} from '~components/common/Message';
import SidebarSkeleton from '~components/common/sidebar/SidebarSkeleton';
import SelectIcon from '~components/svgs/SelectIcon';
import {
  updateTranslationLanguage,
  type SettingsType,
  updateGPTModel,
  updateShowChippyToggle,
} from '~features/settings/settingsSlice';
import { useUserInfo } from '~providers/UserInfoProvider';
import { useAppDispatch, useAppSelector } from '~store';
// rome-ignore lint/correctness/noUnusedVariables: <explanation>
import { FREE_MESSAGE_LIMIT, languages } from '~utils/constants';
import { SupportedAIModels } from '~utils/types';

const SettingsChippyToggle = () => {
  const { showChippyToggle }: SettingsType = useAppSelector(
    (state) => state.settings,
  );
  const dispatch = useAppDispatch();

  const [showChippy, setShowChippy] = useState<boolean>(showChippyToggle);

  const handleOnClick = () => {
    dispatch(updateShowChippyToggle({ showChippyToggle: !showChippy }));
    setShowChippy(!showChippy);
  };

  return (
    <MessageInputContainer>
      <CheckboxInput
        label='Show Chippy while browsing'
        onClick={handleOnClick}
        value={showChippy}
      />
    </MessageInputContainer>
  );
};

const Settings = () => {
  // rome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { translationLanguage, model }: SettingsType = useAppSelector(
    (state) => state.settings,
  );
  const dispatch = useAppDispatch();
  const {
    logout,
    login,
    user,
    upgrade,
    upgradeIsAwaitingLogin,
    openBillingDashboard,
  } = useUserInfo();
  // rome-ignore lint/correctness/noUnusedVariables: <explanation>
  const updateTranslation = (lang: string) => {
    dispatch(updateTranslationLanguage({ lang }));
  };

  const handleUpdateGPTModel = (model: SupportedAIModels) => {
    dispatch(updateGPTModel({ model }));
  };

  return (
    <SidebarSkeleton>
      <Wrapper>
        <Item>
          <p>Model</p>
          <SelectPopupWrapper>
            <SelectPopupContainer className='sub-menu'>
              <SelectComponent
                value={SupportedAIModels.gpt4 === model ? 'GPT 4' : 'GPT 3.5'}
                onSelect={(label) => {
                  if (label === 'GPT 4' && user.isFree) {
                    if (
                      confirm(
                        'You need a paid account to use GPT-4. Upgrade now?',
                      )
                    ) {
                      upgrade();
                    }
                    return false;
                  }
                  let model;
                  switch (label) {
                    case 'GPT 4':
                      model = SupportedAIModels.gpt4;
                      break;
                    default:
                      model = SupportedAIModels.gpt3;
                      break;
                  }
                  handleUpdateGPTModel(model);
                }}
                lists={['GPT 3.5', 'GPT 4']}
              />
            </SelectPopupContainer>
            <Button>
              {SupportedAIModels.gpt4 === model ? 'GPT 4' : 'GPT 3.5'}
              <SelectIcon />
            </Button>
          </SelectPopupWrapper>
        </Item>
        {/* <Item>
          <p>Translation Language</p>
          <SelectPopupWrapper>
            <SelectPopupContainer className='sub-menu'>
              <SelectComponent
                value={translationLanguage}
                onSelect={(lang) => updateTranslation(lang)}
                lists={languages}
              />
            </SelectPopupContainer>
            <Button>
              {translationLanguage}
              <SelectIcon />
            </Button>
          </SelectPopupWrapper>
        </Item> */}
        <Divider />
        <Item>
          <p>Account{user?.profile && <>: {user.profile.email}</>}</p>
          {user?.profile && (
            <Button
              onClick={() => {
                logout();
              }}
            >
              Log out
            </Button>
          )}
          {!user?.profile && (
            <Button
              onClick={() => {
                login();
              }}
            >
              Sign in
            </Button>
          )}
        </Item>
        <Divider />
        <Item>
          <SettingsChippyToggle />
        </Item>
        <Divider />
        {user.isFree && (
          <Item>
            <p>Plan: Limited to {FREE_MESSAGE_LIMIT}/messages a day.</p>
            <Button onClick={upgrade}>
              {!upgradeIsAwaitingLogin && 'Upgrade'}
              {upgradeIsAwaitingLogin && 'Logging in...'}
            </Button>
          </Item>
        )}
        {!user.isFree && (
          <Item>
            <p>Plan: Paid.</p>
            <Button onClick={openBillingDashboard}>Manage Plan</Button>
          </Item>
        )}
      </Wrapper>
    </SidebarSkeleton>
  );
};

export default Settings;
