"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const socials = [
    { name: "YOUTUBE", url: "https://www.youtube.com/channel/UCMZx5j45AytavudrXKKeGlQ", color: "hover:bg-[#FF0000] active:bg-[#FF0000]", span: "" },
    { name: "TWITCH", url: "https://www.twitch.tv/auger", color: "hover:bg-[#9146FF] active:bg-[#9146FF]", span: "" },
    { name: "KICK", url: "https://kick.com/auger96", color: "hover:bg-[#53FC18] active:bg-[#53FC18]", span: "" },
    { name: "PATREON", url: "https://www.patreon.com/cw/auger96", color: "hover:bg-[#FF424D] active:bg-[#FF424D]", span: "" },
    { name: "SPOTIFY", url: "https://open.spotify.com/artist/2Wfjz6j58o9iADw66vQJss?si=5yadkMXVTZi_Ie-Q16EPZQ", color: "hover:bg-[#1DB954] active:bg-[#1DB954]", span: "" },
    { name: "X", url: "https://x.com/TTVauger", color: "hover:bg-black active:bg-black", span: "" },
    { name: "INSTAGRAM", url: "https://www.instagram.com/andrew_rancourt/", color: "hover:bg-[#E1306C] active:bg-[#E1306C]", span: "" },
    { name: "TIKTOK (@Auger96)", url: "https://www.tiktok.com/@ttvauger96", color: "hover:bg-[#000000] active:bg-[#000000]", span: "" },
    { name: "TIKTOK (@augeryalt)", url: "https://www.tiktok.com/@augeralt", color: "hover:bg-[#000000] active:bg-[#000000]", span: "" },
    { name: "AGR NYC", url: "https://agrnyc.com/", color: "hover:bg-[#800080] active:bg-[#800080]", span: "" },
    { name: "DISCORD", url: "https://discord.com/invite/NFBNW34nKJ", color: "hover:bg-[#5865F2] active:bg-[#5865F2]", span: "col-span-2 md:col-span-3 lg:col-span-5" },
];

export default function SocialLinks() {
    return (
        <section className="w-full py-12 px-4 md:px-6 border-t border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight uppercase text-white mb-6">
                    Links
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {socials.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`group relative border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center transition-all duration-300 ${social.color} ${social.span} ${social.name === "DISCORD" ? "h-[calc((100vw-2rem-0.75rem)/2*0.667)] md:h-[calc((100vw-3rem-1.5rem)/3*0.667)] lg:h-[calc((min(1280px,100vw)-3rem-3rem)/5*0.667)]" : "aspect-square"}`}
                        >
                            <span className="font-mono text-xs tracking-wider group-hover:text-white group-active:text-white transition-colors">
                                {social.name}
                            </span>
                            <ExternalLink className="absolute bottom-2 right-2 w-3 h-3 text-zinc-700 group-hover:text-white group-active:text-white transition-colors" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
