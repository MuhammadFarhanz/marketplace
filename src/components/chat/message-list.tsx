import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
interface Message {
  id: string;
  message: string;
  userId: string;
}

interface MessageListProps {
  messages: Message[];
  conversationId: string | null;
  isLoading: boolean;
}

/**
 * Represent a list of message in a conversation
 *
 * This component is render the list of messages in a conversation thread, with proper styling based on the sender
 * @component
 * @param {Object} props - The Component Props
 * @param {Message[]} props.messages - An array of message objects.
 * @param {string|null} props.conversationId - The ID of the current conversation.
 * @param {boolean} props.isLoading - A flag indicating whether messages are still loading.
 * @returns {JSX.Element} - The jsx element representing the list of message.
 */

const MessageList: React.FC<MessageListProps> = ({
  messages,
  conversationId,
  isLoading,
}) => {
  const { data: sessionData } = useSession();
  const sender = sessionData?.user?.id;

  const scrollRef = useRef<HTMLLIElement>(null);

  // Scroll the latest message whenever the messages are loaded
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`m-2 flex items-end ${
            message.userId !== sender ? "" : "justify-end"
          }`}
        >
          <div
            className={`text-md mx-2 flex max-w-xs flex-col space-y-2 break-words ${
              message.userId !== sender ? "items-start" : "items-end"
            }`}
          >
            <div>
              <span
                className={`inline-block rounded-lg border border-black px-4 py-2  ${
                  message.userId !== sender
                    ? "rounded-tl-none bg-gray-300 text-gray-600"
                    : "rounded-tr-none bg-neutral-100 text-black"
                }`}
              >
                {message.message}
              </span>
              {/* <span>19:30 PM</span> */}
            </div>
          </div>
        </div>
      ))}
      <li ref={scrollRef} className="h-1 list-none"></li>
    </div>
  );
};

export default MessageList;
