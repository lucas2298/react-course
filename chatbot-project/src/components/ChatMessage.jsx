import "./ChatMessage.css";

export function ChatMessage(props) {
    const { message, sender } = props;

    return (
        <div
            className={
                sender === "bot" ? "chat-message-bot" : "chat-message-user"
            }
        >
            {sender === "bot" && (
                <img
                    src="https://supersimple.dev/projects/chatbot/robot.png"
                    width="45"
                />
            )}
            <div className="chat-message-text">{message}</div>
            {sender === "user" && (
                <img
                    src="https://supersimple.dev/projects/chatbot/user.png"
                    width="45"
                />
            )}
        </div>
    );
}