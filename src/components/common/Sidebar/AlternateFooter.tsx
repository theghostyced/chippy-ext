import { MessageButtonCta, SidebarBottomContainer } from '../Message';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '~components/svgs/PlusIcon';
import { useConversations } from '~providers/Conversations';

export default function AlternateFooter() {
  const navigate = useNavigate();
  const { startNewConversation } = useConversations();

  const createNewConversion = () => {
    startNewConversation();
    navigate('/conversations/current');
  };

  return (
    <SidebarBottomContainer>
      <MessageButtonCta onClick={() => createNewConversion()}>
        New Chat <PlusIcon />
      </MessageButtonCta>
    </SidebarBottomContainer>
  );
}
