import { useFormik } from "formik";
import { NEW_MESSAGE } from "~/constants/newMessage";
import { api } from "~/utils/api";
import PlaneIcon from "../svgcomponent/planeIcon";
interface MessageFormProps {
  recipient: string | string[] | undefined;
  currentConversationId: string | null;
  setSelectedConversationId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}
interface Message {
  message: string;
}

/**
 * Represents the form for sending messages.
 *
 * This component provides a user interface for composing and sending messages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string|string[]|undefined} props.recipient - The recipient of the message.
 * @param {string|null} props.currentConversationId - The ID of the current conversation.
 * @param {React.Dispatch<React.SetStateAction<string|null>>} props.setSelectedConversationId - A function to set the selected conversation ID.
 * @returns {JSX.Element} The JSX element representing the message form.
 */

const MessageForm: React.FC<MessageFormProps> = ({
  recipient,
  currentConversationId,
  setSelectedConversationId,
}) => {
  // Access the API context to retrieve utilities
  const utils = api.useContext();

  // Initialize the send message mutation using the API
  const sendMessageMutation = api.message.sendMessage.useMutation();

  // Use Formik for managing form state and handling form submissions
  const formik = useFormik<Message>({
    initialValues: {
      message: "",
    },
    onSubmit: async (values: Message, { resetForm }) => {
      const recipientId = typeof recipient === "string" ? recipient : "";
      if (values.message !== "") {
        sendMessageMutation.mutate(
          {
            messageText: values.message,
            ...(currentConversationId === NEW_MESSAGE
              ? { userId: recipientId! }
              : { conversationId: currentConversationId }),
          },
          {
            onSettled: (data, error) => {
              // Invalidate conversation and messages caches
              if (currentConversationId !== NEW_MESSAGE) {
                utils.message.conversations.invalidate();
                utils.message.messages.invalidate({
                  conversationId: currentConversationId!,
                });
              }
              if (data) {
                setSelectedConversationId(data.id);
              }
              if (error) {
                alert(error.message);
              }
            },
          }
        );
      } else {
        console.log("Message cannot be empty");
      }
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex w-full items-center justify-end  p-4"
    >
      <input
        type="text"
        placeholder="Type a message..."
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        className="h-12 w-full rounded border border-black bg-neutral-100 px-4  pr-12 focus:shadow-[4px_4px_0_0_#000000] focus:outline-none focus:ring-0 dark:bg-neutral-700"
      ></input>
      <button className="absolute mr-3 flex flex-row space-x-3">
        {/* <img
          className="w-[35px] sm:w-[20px]"
          src={"/assets/plus.svg"}
          alt="star"
        /> */}
        <PlaneIcon />
      </button>
    </form>
    // <form
    //   onSubmit={formik.handleSubmit}
    //   className="absolute bottom-0 m-4 flex h-[8%] w-[95%]  items-center bg-black shadow-md"
    // >

    //   <div className="flex h-full w-full -translate-x-[3px] -translate-y-[3px] items-center border-2 border-black bg-[#E9E9E9]">
    //     <div className="flex h-full w-full ">
    //       <input
    //         className=" w-full flex-shrink-0 appearance-none border-black bg-transparent px-3 py-2 leading-tight placeholder:text-black focus:outline-none"
    //         id="message"
    //         name="message"
    //         placeholder="Enter message"
    //         value={formik.values.message}
    //         onChange={formik.handleChange}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className=" ml-2 mr-2 flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-black bg-[#b38af0] font-bold"
    //     >
    //       <PlaneIcon />
    //     </button>
    //   </div>
    // </form>
  );
};

export default MessageForm;
