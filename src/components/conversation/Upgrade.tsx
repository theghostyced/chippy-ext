import Options from '../common/Options/Options';
import {
  MessageBoxContainer,
  PromptMessageContainer,
} from '~components/common/Message';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useUserInfo } from '~providers/UserInfoProvider';

export default function Upgrade() {
  const { overLimitVisible, setOverLimitVisible } = useSidebarContext();
  const { upgradeIsAwaitingLogin, upgrade } = useUserInfo();
  if (!overLimitVisible) {
    return <></>;
  }
  return (
    <MessageBoxContainer>
      <PromptMessageContainer>
        <Options
          onClose={() => {
            setOverLimitVisible(false);
          }}
          title="You've hit the limit of free daily conversations. Upgrade to continue the conversation."
          options={[
            {
              label: upgradeIsAwaitingLogin ? 'Logging in...' : 'Upgrade',
              onClick: upgrade,
            },
          ]}
        />
      </PromptMessageContainer>
    </MessageBoxContainer>
  );
}
