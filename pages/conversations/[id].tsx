import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { GetServerSideProps } from "next";
import { Conversation, IMessage } from "../../types";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  generateQueryGetMessages,
  transformMessage,
} from "../../utils/getMessagesInConversation";
import ConversationScreen from "../../components/ConversationScreen";

const StyledContainer = styled.div`
  display: flex;
`;

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

function Conversation({ conversation, messages }) {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>

      <Sidebar />

      <StyledConversationContainer>
        <ConversationScreen conversation={conversation} messages={messages} />
      </StyledConversationContainer>
    </StyledContainer>
  );
}

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  // get conversation, to know who we are chatting with
  const conversationRef = doc(db, "conversations", conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);

  const messages = messagesSnapshot.docs.map((messageDoc) => {
    // console.log("messagesDoc:", messageDoc);
    return transformMessage(messageDoc);
  });

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages,
    },
  };
};
