import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

export function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const chatMessagesContainer = chatMessagesRef.current;
        if (chatMessagesContainer) {
            chatMessagesContainer.scrollTop =
                chatMessagesContainer.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((message) => {
                return (
                    <ChatMessage
                        message={message.message}
                        sender={message.sender}
                        key={message.id}
                    />
                );
            })}
        </div>
    );
}
