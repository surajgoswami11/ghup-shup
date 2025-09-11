import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

export default function ChatContainer() {
    const { messages, getMessages, isMessagesLoading, selectedUser } =
        useChatStore();

    const { authUser } = useAuthStore()

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

    if (isMessagesLoading)
        return (
            <div className="flex flex-col flex-1 overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );

    return (
        <div className="flex flex-col flex-1 overflow-auto">
            <ChatHeader />

            <div className="flex-1 p-4 space-y-4 overflow-y-4">
                {messages.map((message, index) => (
                    <div className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} key={index}>
                        <div className="chat-image avatar">
                            <div className="border rounded-full size-10">
                                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} />
                            </div>
                        </div>
                        <div className="mb-1 chat-header">
                            <time className="ml-1 text-xs opacity-50">
                                {new Date(message.createdAt).toLocaleTimeString()}
                            </time>
                        </div>
                        <div className="flex chat-bubble">
                            {message.image && (
                                <img
                                    src={message?.image}
                                    alt="attchment"
                                    className="sm:max-w-[200px] rounded-mb mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
}
