import { Bot, Image, Search, Sparkles, SquarePen } from "lucide-react";
import logo from "../assets/logo.png";

export default function BhashaRight() {
    return (
        <div className="w-20 h-full bg-[#FAD400] flex flex-col justify-between items-center py-6 border-l border-[#333] relative">
            <div className="flex flex-col gap-8 items-center">
                {/* Logo */}
                <img
                    src={logo}
                    alt="Bhasha Logo"
                    className="h-24 w-auto object-contain"
                />

                {/* Navigation Icons */}
                <div className="flex flex-col gap-6 items-center mt-4">
                    <button className="p-2 text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <SquarePen className="w-6 h-6 stroke-[1.5]" />
                    </button>

                    <button className="p-2 text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <Image className="w-6 h-6 stroke-[1.5]" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6 items-center mb-2">
                <button className="p-2 text-white hover:bg-[#2f2f2f] rounded-full transition-colors">
                    <Sparkles className="w-6 h-6 stroke-[1.5]" />
                </button>

                {/* User Avatar */}
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity">
                    A
                </div>
            </div>
        </div>
    )
}
