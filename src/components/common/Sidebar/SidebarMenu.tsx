// // Don't use for now ...
// import Close from '~components/svgs/Close';
// import SidebarChevron from '~components/svgs/SidebarChevron';
// import SidebarMenuBackground from '~components/svgs/SidebarMenuBackground';
// import {
//   createConversation,
//   submitConversation,
// } from '~features/conversations/conversationsSlice';
// import { useTextSelection } from '~hooks/useTextSelection';
// import { useTrackEvent } from '~hooks/useTrackEvent';
// import { useConversations } from '~providers/Conversations';
// import { useSidebarContext } from '~providers/SidebarProvider';
// import { useAppDispatch } from '~store';
// import { generateId } from '~utils/conversation';

export default function SidebarMenu({ _visible }) {
  return <></>;
  // const { selectedText } = useTextSelection();
  // const { toggle } = useSidebarContext();
  // const { trackEvent } = useTrackEvent();
  // const { setActiveConversationId } = useConversations();

  // const dispatch = useAppDispatch();

  // const addMessageWithContent = (content) => {
  //   const newConversationId = generateId();
  //   dispatch(
  //     createConversation({
  //       content,
  //       conversationId: newConversationId,
  //     }),
  //   );
  //   setActiveConversationId(newConversationId);
  //   dispatch(submitConversation(newConversationId));
  //   toggle();
  // };

  // const grammarCheck = () => {
  //   trackEvent('Sidebar_Grammar');
  //   const content = `Rewrite the following text to be grammatically correct: ${selectedText}`;
  //   addMessageWithContent(content);
  // };

  // const summarize = () => {
  //   trackEvent('Sidebar_Summarize');
  //   const content = `Summarize this text with a short paragraph and then with a bullet point list with the most important things (illustrate each point with an emoji): ${selectedText}`;
  //   addMessageWithContent(content);
  // };

  // const explain = () => {
  //   trackEvent('Sidebar_Explain');
  //   const content = `Explain the following text: ${selectedText}`;
  //   addMessageWithContent(content);
  // };

  // const question = () => {
  //   trackEvent('Sidebar_Question');
  //   const content = `I'm going to ask a follow up question based on this content: "${selectedText}"`;
  //   addMessageWithContent(content);
  // };

  // return (
  //   <div className={`sidebar__menu ${visible && 'visible'}`}>
  //     <SidebarMenuBackground />
  //     <header>
  //       <p>Improve writing</p>
  //       <Close />
  //     </header>
  //     <nav>
  //       <button type='button' onClick={() => grammarCheck()}>
  //         <span>Grammar check</span>
  //         <SidebarChevron />
  //       </button>
  //       <button type='button' onClick={() => summarize()}>
  //         <span>Summarize</span>
  //         <SidebarChevron />
  //       </button>
  //       <button type='button' onClick={() => explain()}>
  //         <span>Explain</span>
  //         <SidebarChevron />
  //       </button>
  //       <button type='button' onClick={() => question()}>
  //         <span>Ask a question</span>
  //         <SidebarChevron />
  //       </button>
  //     </nav>
  //   </div>
  // );
}
