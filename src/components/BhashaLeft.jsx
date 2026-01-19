import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import SearchBar from "./SearchBar";
import BhashaChat from "./BhashaChat";

export default function BhashaLeft({ isRightPanelOpen, onToggleRightPanel }) {
    const [messages, setMessages] = useState([
        {
            id: Date.now(),
            role: "assistant",
            content: "Hello! I am BhashaGPT. How can I help you today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content) => {
        if (!content.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: content
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: content })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Something went wrong");
            }

            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.response
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error calling backend:", error);
            const errorMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: `Error: ${error.message}`
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex-1 h-full bg-[#171717] p-6 relative flex flex-col justify-end transition-all duration-300 ease-in-out`}>

            <BhashaChat messages={messages} />
            <button
                onClick={onToggleRightPanel}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                title={isRightPanelOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                {isRightPanelOpen ? <PanelRightClose size={24} /> : <PanelRightOpen size={24} />}
            </button>

            <SearchBar onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
    )
}
