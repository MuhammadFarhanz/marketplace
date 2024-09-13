import { api } from '~/utils/api';

export const useSendMessage = () => {;
  const sendMessageMutation = api.message.sendMessage.useMutation();

  const sendMessage = async (messageData:any) => {

    try {
     await sendMessageMutation.mutateAsync(messageData.messageText.message, messageData.conversationId)
      
    } catch (error) {
      
      console.error('Failed to sendMessage:', error);
    }
  };

  return sendMessage;
};
