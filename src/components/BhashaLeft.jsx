import { PanelRightClose, PanelRightOpen } from "lucide-react";
import SearchBar from "./SearchBar";
import BhashaChat from "./BhashaChat";

export default function BhashaLeft({ isRightPanelOpen, onToggleRightPanel }) {
    return (
        <div className={`flex-1 h-full bg-[#171717] p-6 relative flex flex-col justify-end transition-all duration-300 ease-in-out`}>

            <BhashaChat />
            <button
                onClick={onToggleRightPanel}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                title={isRightPanelOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                {isRightPanelOpen ? <PanelRightClose size={24} /> : <PanelRightOpen size={24} />}
            </button>

            <SearchBar />
        </div>
    )
}
