import React from "react";
import ConversationCard from "./conversation-card";
import { Input } from "../ui/input";
import { Settings } from "lucide-react";

const ConversationList = ({
  conversations,
  setSelectedConversationId,
  setCurrentRecipient,
}: any) => {
  return (
    <div className="h-full flex-col bg-white">
      <div className="m-4 flex flex-row justify-between">
        <h1 className="text-lg font-bold leading-3">Search Message</h1>
        <Settings strokeWidth={1} className="hover:stroke-red-300" />
      </div>
      <div className="relative border-b border-black p-4">
        <Input
          type="text"
          placeholder="Search"
          className="relative mr-4 rounded-sm border border-black"
        />
      </div>
      {conversations == null ? (
        <div className="flex h-full items-center justify-center font-bold">
          Start a conversation to connect with others.
        </div>
      ) : (
        conversations.map((conversationData: any) => (
          <ConversationCard
            key={conversationData.id}
            data={conversationData}
            setSelectedConversationId={setSelectedConversationId}
            setCurrentRecipient={setCurrentRecipient}
          />
        ))
      )}
    </div>
  );
};

export default ConversationList;
