import { Bot, User } from "lucide-react";

export default function BhashaChat({ messages }) {
    return (
        <div className="flex-1 w-full overflow-y-auto mb-4 py-10 px-10 custom-scrollbar">
            <div className="flex flex-col gap-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-white text-black" : "bg-[#FAD400] text-black"
                                }`}
                        >
                            {msg.role === "assistant" ? (
                                <Bot className="w-5 h-5" />
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                        </div>
                        <div
                            className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === "assistant"
                                ? "bg-[#2f2f2f] text-gray-100"
                                : "bg-[#3f3f3f] text-gray-100"
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
