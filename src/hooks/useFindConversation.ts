  import { api } from "~/utils/api";

  export const useFindConversation = (selectedConversationId: any) => {
    const { data: conversation } = api.message.findConversation.useQuery(
    {
      userId: selectedConversationId,
    },
    {
      enabled: !!selectedConversationId
    }
    );

    return conversation;
  };


