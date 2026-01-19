import { useState, useEffect, useRef } from "react";
import { AudioLines, Languages, Mic, Send } from "lucide-react";
import gsap from "gsap";

export default function SearchBar({ onSendMessage, isLoading }) {
    const [message, setMessage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [showLanguages, setShowLanguages] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const audioWaveRef = useRef(null);
    const recognitionRef = useRef(null);

    const languages = [
        "English", "Hindi", "Spanish", "French", "German",
        "Chinese", "Japanese", "Arabic", "Bengali", "Tamil"
    ];

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");
                setMessage(transcript);
            };

            recognitionRef.current.onend = () => {
                if (isRecording) {
                    recognitionRef.current.start();
                }
            };
        }
    }, [isRecording]);

    const speak = (text) => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel(); // Stop any current speech
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    // Animate audio waves and handle recognition when recording changes
    useEffect(() => {
        if (isRecording && audioWaveRef.current) {
            const bars = audioWaveRef.current.children;
            Array.from(bars).forEach((bar) => {
                gsap.to(bar, {
                    scaleY: "random(0.3, 1.5)",
                    duration: "random(0.2, 0.5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 0.2
                });
            });

            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                } catch (e) {
                    console.error("Recognition start error:", e);
                }
            }
        } else if (audioWaveRef.current) {
            const bars = audioWaveRef.current.children;
            Array.from(bars).forEach((bar) => {
                gsap.to(bar, {
                    scaleY: 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        }
    }, [isRecording]);

    const handleSend = async () => {
        if (message.trim() && !isLoading) {
            const currentMessage = message;
            setMessage("");
            const responseText = await onSendMessage(currentMessage);
            if (isRecording && responseText) {
                speak(responseText);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
    };

    const barCount = 20;

    return (
        <div className="space-y-4 relative">
            {showLanguages && (
                <div className="bg-[#2f2f2f] rounded-2xl border border-gray-600 p-4 mb-2">
                    <div className="text-gray-400 text-sm font-medium mb-3">Select Language:</div>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => {
                                    setSelectedLanguage(lang);
                                    setShowLanguages(false);
                                }}
                                className={`px-4 py-2 rounded-lg text-left transition-colors ${selectedLanguage === lang
                                    ? "bg-white text-black"
                                    : "bg-[#3f3f3f] text-white hover:bg-[#4f4f4f]"
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-[#2f2f2f] rounded-3xl border border-gray-600 p-2 flex items-center gap-2">
                <button
                    onClick={() => setShowLanguages(!showLanguages)}
                    className="p-2 hover:bg-[#3f3f3f] rounded-full transition-colors"
                    aria-label="Select language"
                >
                    <Languages className="w-5 h-5 text-gray-400" />
                </button>
                <span className="text-gray-300 text-sm font-medium px-2 border-r border-gray-600">
                    {selectedLanguage}
                </span>

                {isRecording ? (
                    <div className="flex-1 flex items-center justify-center gap-1 h-10 px-4">
                        <div ref={audioWaveRef} className="flex items-center gap-1 h-full">
                            {Array.from({ length: barCount }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-white rounded-full"
                                    style={{ height: "20%" }}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Message BhashaGPT..."
                        className="flex-1 bg-transparent text-white px-4 py-2 focus:outline-none placeholder-gray-500"
                        disabled={isLoading}
                    />
                )}

                <button
                    onClick={() => console.log("Mic clicked")}
                    className="p-2 hover:bg-[#3f3f3f] rounded-full transition-colors"
                    aria-label="Microphone"
                >
                    <Mic className="w-5 h-5 text-gray-400" />
                </button>
                <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-full transition-colors ${isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "hover:bg-[#3f3f3f]"
                        }`}
                    aria-label="Voice input"
                >
                    <AudioLines className={`w-5 h-5 ${isRecording ? "text-white" : "text-gray-400"}`} />
                </button>
                <button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    className={`p-2 rounded-full transition-colors ${message.trim() && !isLoading
                        ? "bg-white hover:bg-gray-200 text-black"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
