
import { NEW_MESSAGE } from "~/constants/newMessage";
import { api } from "~/utils/api";


export const useGetMessages = (selectedConversationId: any) => {
  const { data: messages, refetch , isLoading} = api.message.messages.useQuery(
  {
    conversationId: selectedConversationId!
  },
  {
    enabled:selectedConversationId !== null && selectedConversationId !== NEW_MESSAGE,
  }
  );

  return {messages, isLoading};
};


