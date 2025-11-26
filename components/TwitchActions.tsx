"use client";

import { Heart, DollarSign, Star } from "lucide-react";

export default function TwitchActions() {
    const actions = [
        {
            label: "SUBSCRIBE",
            url: "https://www.twitch.tv/subs/auger",
            icon: Star,
            color: "hover:bg-[#9146FF] hover:border-[#9146FF]",
            textColor: "group-hover:text-white"
        },
        {
            label: "FOLLOW",
            url: "https://www.twitch.tv/auger",
            icon: Heart,
            color: "hover:bg-[#E91916] hover:border-[#E91916]",
            textColor: "group-hover:text-white"
        },
        {
            label: "DONATE",
            url: "https://streamlabs.com/auger/tip",
            icon: DollarSign,
            color: "hover:bg-[#00E6CB] hover:border-[#00E6CB]",
            textColor: "group-hover:text-black"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {actions.map((action) => (
                <a
                    key={action.label}
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center gap-3 p-4 bg-zinc-950 border border-zinc-800 transition-all duration-300 ${action.color}`}
                >
                    <action.icon className={`w-5 h-5 text-zinc-400 transition-colors ${action.textColor}`} />
                    <span className={`font-mono text-xs tracking-wider text-zinc-400 transition-colors ${action.textColor}`}>
                        {action.label}
                    </span>
                </a>
            ))}
        </div>
    );
}
