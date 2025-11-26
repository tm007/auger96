"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TweetWall() {
    const [tweets, setTweets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTweets() {
            try {
                const res = await fetch("/api/twitter");
                console.log("Twitter API fetch response status:", res.status);

                if (res.ok) {
                    const data = await res.json();
                    console.log("Twitter API data received:", data);
                    console.log("Is array?", Array.isArray(data));
                    console.log("Length:", data?.length);

                    if (Array.isArray(data)) {
                        setTweets(data);
                        console.log(`Set ${data.length} tweets`);
                    } else {
                        console.error("Twitter API returned unexpected data format:", data);
                        setTweets([]);
                    }
                } else {
                    const errorData = await res.json();
                    console.error("Twitter API request failed:", res.status, res.statusText, errorData);
                    setTweets([]);
                }
            } catch (error) {
                console.error("Failed to load Tweets", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTweets();
    }, []);

    function formatTime(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    }

    return (
        <section className="w-full py-12 px-4 md:px-6 border-t border-zinc-900 bg-zinc-950/30">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight uppercase text-white mb-6">
                    Tweets
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? (
                        Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-[200px] bg-zinc-900 animate-pulse border border-zinc-800" />
                        ))
                    ) : tweets.length > 0 ? (
                        tweets.map((tweet, index) => (
                            <motion.div
                                key={tweet.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 border border-zinc-800 bg-black min-h-[200px] flex flex-col justify-between hover:border-zinc-600 transition-colors group"
                            >
                                <div className="text-base text-zinc-300 mb-4 leading-relaxed font-sans">
                                    {tweet.text}
                                </div>
                                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors pt-4 border-t border-zinc-900">
                                    <span>@ttvauger96</span>
                                    <span>{formatTime(tweet.created_at)}</span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-zinc-600 font-mono py-10">
                            NO TWEETS FOUND - CHECK CONSOLE FOR ERRORS
                        </div>
                    )}
                </div>
                <p className="mt-8 text-xs font-mono text-zinc-600 text-center uppercase tracking-widest">
                    Feed // @ttvauger96
                </p>
            </div>
        </section>
    );
}
