"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function ContentFeed() {
    const [longFormVideos, setLongFormVideos] = useState<any[]>([]);
    const [shorts, setShorts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                // Fetch long-form videos and shorts separately
                const [longFormRes, shortsRes] = await Promise.all([
                    fetch("/api/youtube"),
                    fetch("/api/youtube-shorts")
                ]);

                if (longFormRes.ok) {
                    const data = await longFormRes.json();
                    setLongFormVideos(data);
                } else {
                    const err = await longFormRes.json();
                    console.error("YouTube API request failed:", longFormRes.status, err);
                    setError(err.error || "Failed to load videos");
                }

                if (shortsRes.ok) {
                    const data = await shortsRes.json();
                    setShorts(data);
                } else {
                    const err = await shortsRes.json();
                    console.error("YouTube Shorts API request failed:", shortsRes.status, err);
                    // Don't overwrite main error if shorts fail, but log it
                    if (!error) setError(err.error || "Failed to load shorts");
                }
            } catch (error) {
                console.error("Failed to load YouTube videos", error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, []);

    return (
        <section className="w-full py-12 px-4 md:px-6 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Long-form Videos Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight uppercase text-white mb-6">
                        Videos
                    </h2>
                    {error && (
                        <div className="mb-4 p-4 bg-red-900/20 border border-red-900 text-red-200 font-mono text-xs">
                            ERROR: {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div key={i} className="aspect-video bg-zinc-900 animate-pulse border border-zinc-800" />
                            ))
                        ) : (
                            longFormVideos.length > 0 ? (
                                longFormVideos.map((video: any, i: number) => (
                                    <motion.a
                                        key={video.id.videoId}
                                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="relative aspect-video bg-zinc-900 border border-zinc-800 group overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={video.snippet.thumbnails.high.url}
                                            alt={video.snippet.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
                                                <Play className="w-6 h-6 text-white fill-white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                                            <p className="text-xs font-mono text-white truncate">{video.snippet.title}</p>
                                        </div>
                                    </motion.a>
                                ))
                            ) : (
                                <div className="col-span-3 text-center text-zinc-600 font-mono py-10">
                                    NO LONG-FORM VIDEOS FOUND
                                </div>
                            )
                        )}
                    </div>
                    <p className="mt-3 text-xs font-mono text-zinc-600">
                        SOURCE: @realauger96
                    </p>
                </div>

                {/* Shorts Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight uppercase text-white mb-6">
                        Shorts
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {loading ? (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-[9/16] bg-zinc-900 animate-pulse border border-zinc-800" />
                            ))
                        ) : (
                            shorts.length > 0 ? (
                                shorts.slice(0, 12).map((video: any, i: number) => (
                                    <motion.a
                                        key={video.id.videoId}
                                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="relative aspect-[9/16] bg-zinc-900 border border-zinc-800 group overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={video.snippet.thumbnails.high.url}
                                            alt={video.snippet.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
                                                <Play className="w-5 h-5 text-white fill-white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                            <p className="text-[10px] font-mono text-white truncate">{video.snippet.title}</p>
                                        </div>
                                    </motion.a>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-zinc-600 font-mono py-10">
                                    NO SHORTS FOUND
                                </div>
                            )
                        )}
                    </div>
                    <p className="mt-3 text-xs font-mono text-zinc-600">
                        SOURCE: @realauger96
                    </p>
                </div>

                {/* TikTok Feed - Manual/Placeholder as API is restricted */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tight uppercase text-white mb-6">
                        Clips
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={`tt-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="relative aspect-[9/16] bg-zinc-900 border border-zinc-800 group overflow-hidden flex items-center justify-center"
                            >
                                <div className="text-zinc-700 font-mono text-xs text-center px-2">
                                    @AUGER96<br />CLIP_{i}
                                </div>
                                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600">
                                    TIKTOK
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-3 text-xs font-mono text-zinc-600">
                        SOURCE: @Auger96, @augeryalt
                    </p>
                </div>
            </div>
        </section>
    );
}
