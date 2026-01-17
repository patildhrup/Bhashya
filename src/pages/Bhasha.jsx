import { useState } from "react";
import BhashaLeft from "../components/BhashaLeft";
import BhashaRight from "../components/BhashaRight";

export default function Bhasha() {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

    return (
        <div className="h-screen w-full flex overflow-hidden bg-[#181818] fixed">
            <BhashaLeft
                isRightPanelOpen={isRightPanelOpen}
                onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
            />
            {isRightPanelOpen && <BhashaRight />}
        </div>
    );
}
