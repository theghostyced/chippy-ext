import SidebarMenuBackground from '~components/svgs/SidebarMenuBackground';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useUserInfo } from '~providers/UserInfoProvider';
import { UpgradeAlertMessage, UpgradeButton } from './style';
import { ThemedAlert } from '~components/svgs/Alert';

export default function UpgradeAlert() {
  const { overLimitVisible, isOpen, setOverLimitVisible } = useSidebarContext();
  const { user, upgradeIsAwaitingLogin, upgrade } = useUserInfo();

  return (
    <div
      className={`sidebar__menu sidebar__menu--upgrade ${
        overLimitVisible && isOpen && 'visible'
      }`}
      onClick={() => {
        if (!user.isFree) {
          setOverLimitVisible(false);
        }
      }}
      onKeyUp={() => {
        if (!user.isFree) {
          setOverLimitVisible(false);
        }
      }}
    >
      <SidebarMenuBackground />
      {user.isFree && (
        <nav>
          <UpgradeAlertMessage>
            <ThemedAlert />
            <br />
            You've hit the limit of free daily conversations. Upgrade to
            continue the conversation.
          </UpgradeAlertMessage>
          <UpgradeButton onClick={upgrade}>
            <span>&bull;</span>{' '}
            {upgradeIsAwaitingLogin ? 'Logging in...' : 'Upgrade'}
          </UpgradeButton>
        </nav>
      )}
      {!upgradeIsAwaitingLogin && !user.isFree && (
        <nav>
          <UpgradeAlertMessage>
            Your account has been upgraded. Enjoy longer conversations with
            Chippy!
          </UpgradeAlertMessage>
        </nav>
      )}
    </div>
  );
}
