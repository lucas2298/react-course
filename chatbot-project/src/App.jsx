import { useState } from "react";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";
import "./App.css";

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
        </div>
    );
}

export default App;
