"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TwitchData {
    isLive: boolean;
    vods: any[];
    clips: any[];
    schedule: any[];
}

export default function TwitchSection() {
    // State for API data
    const [data, setData] = useState<TwitchData | null>(null);
    const [loading, setLoading] = useState(true);
    // Embed URLs (client‑side only)
    const [embedUrl, setEmbedUrl] = useState<string>("");
    const [chatUrl, setChatUrl] = useState<string>("");

    useEffect(() => {
        // Fetch Twitch data
        async function fetchData() {
            try {
                const res = await fetch("/api/twitch");
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                } else {
                    console.error("Twitch API request failed:", res.status, res.statusText);
                }
            } catch (error) {
                console.error("Failed to load Twitch data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        // Capture hostname and construct embed URLs
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;
            // Add known domains to ensure it works across deployments
            const parents = new Set([
                hostname,
                "auger96.com",
                "www.auger96.com",
                "auger96-hub.pages.dev"
            ]);

            const parentParams = Array.from(parents)
                .map(p => `parent=${p}`)
                .join("&");

            const finalEmbedUrl = `https://player.twitch.tv/?channel=auger&${parentParams}`;
            console.log("Twitch Embed URL:", finalEmbedUrl);
            setEmbedUrl(finalEmbedUrl);
            setChatUrl(`https://www.twitch.tv/embed/auger/chat?${parentParams}&darkpopout`);
        }
    }, []);

    return (
        <section className="w-full py-12 px-4 md:px-6 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold tracking-tight uppercase text-white flex items-center gap-3">
                        LIVE
                        {data?.isLive && (
                            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
                        )}
                    </h2>
                </div>

                {/* Main layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[70vh]">
                    {/* Stream player */}
                    <div className="lg:col-span-3 bg-zinc-900 relative border border-zinc-800">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full absolute inset-0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black text-white">
                                Loading Twitch Stream…
                            </div>
                        )}
                    </div>

                    {/* Chat sidebar */}
                    <div className="lg:col-span-1 bg-black border border-zinc-800 flex flex-col">
                        <div className="p-2 border-b border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-500">CHAT</div>
                        {chatUrl ? (
                            <iframe
                                src={chatUrl}
                                className="w-full flex-1"
                            ></iframe>
                        ) : (
                            <div className="w-full flex-1 flex items-center justify-center bg-black text-white text-xs font-mono">
                                Loading Twitch Chat…
                            </div>
                        )}
                    </div>
                </div>

                {/* Schedule / Info */}
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-900 pt-6">
                    {/* VODs Section */}
                    <div className="p-4 border border-zinc-900 bg-zinc-950/50">
                        <h3 className="text-lg font-bold mb-3 text-white">RECENT VODS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {loading ? (
                                <>
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                </>
                            ) : data?.vods && data.vods.length > 0 ? (
                                data.vods.map((vod: any) => (
                                    <a
                                        key={vod.id}
                                        href={vod.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden"
                                    >
                                        <img
                                            src={vod.thumbnail_url.replace("%{width}", "640").replace("%{height}", "360")}
                                            alt={vod.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 text-[10px] font-mono truncate">
                                            {vod.title}
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-xs font-mono text-zinc-600 py-10">NO ARCHIVES FOUND</div>
                            )}
                        </div>
                    </div>

                    {/* Clips Section */}
                    <div className="p-4 border border-zinc-900 bg-zinc-950/50">
                        <h3 className="text-lg font-bold mb-3 text-white">TOP CLIPS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {loading ? (
                                <>
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                    <div className="aspect-video bg-zinc-900 animate-pulse" />
                                </>
                            ) : data?.clips && data.clips.length > 0 ? (
                                data.clips.map((clip: any) => (
                                    <a
                                        key={clip.id}
                                        href={clip.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden"
                                    >
                                        <img
                                            src={clip.thumbnail_url}
                                            alt={clip.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 text-[10px] font-mono truncate">
                                            {clip.title}
                                        </div>
                                        <div className="absolute top-2 right-2 text-[10px] font-mono bg-black/60 px-1">
                                            {clip.view_count?.toLocaleString()} views
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-xs font-mono text-zinc-600 py-10">NO CLIPS FOUND</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
