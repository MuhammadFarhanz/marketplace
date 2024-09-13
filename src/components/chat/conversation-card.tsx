import React from "react";

interface ConversationCardProps {
  data: any;
  setSelectedConversationId: (conversationId: string) => void;
  setCurrentRecipient: (recipient: any) => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  data,
  setSelectedConversationId,
  setCurrentRecipient,
}) => {
  const recipient =
    data.conversation.conversationUsers[0]?.userId === data.userId
      ? data.conversation.conversationUsers[1]?.user
      : data.conversation.conversationUsers[0]?.user;

  return (
    <div
      className="flex h-20 cursor-pointer border-b border-black p-4 text-black hover:bg-purple-300"
      onClick={() => {
        setSelectedConversationId(data.conversationId);
        setCurrentRecipient(recipient);
      }}
    >
      <img
        src={recipient.image}
        className="w-12 rounded-full border border-black"
        alt="Recipient"
      />
      <div className="ml-2 flex flex-col overflow-hidden">
        <p className="font-bold"> {recipient.name}</p>
        <p className="truncate "> {data.conversation.lastMessage.message}</p>
      </div>
    </div>
  );
};

export default ConversationCard;
