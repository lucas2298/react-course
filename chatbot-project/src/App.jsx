import { useState, useRef, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import "./App.css";

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        if (inputText === null || inputText.trim() === "") {
            return;
        }
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
            },
        ];

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "bot",
                id: crypto.randomUUID(),
            },
        ]);

        setInputText("");
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            sendMessage();
        } else if (event.key === "Escape") {
            setInputText("");
        }
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value={inputText}
            />
            <button onClick={sendMessage} className="send-button">
                Send
            </button>
        </div>
    );
}

function ChatMessage(props) {
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

function ChatMessages({ chatMessages }) {
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

function Excercise() {
    const [isOn, setIsOn] = useState(false);
    return (
        <div>
            <h1>Excercise</h1>
            <p>Excercise: 1</p>
            <button
                className={isOn ? "exc-button-1-on" : "exc-button-1-off"}
                onClick={() => setIsOn(!isOn)}
            >
                {isOn ? "ON" : "OFF"}
            </button>
        </div>
    );
}

function App() {
    const [chatMessages, setChatMessages] = useState([
        {
            message: "hello chatbot",
            sender: "user",
            id: "id1",
        },
        {
            message: "nice to meet you",
            sender: "bot",
            id: "id2",
        },
        {
            message: "today",
            sender: "user",
            id: "id3",
        },
        {
            message: "monday",
            sender: "bot",
            id: "id4",
        },
    ]);

    return (
        <div className="app-container">
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
            <Excercise />
        </div>
    );
}

export default App;
