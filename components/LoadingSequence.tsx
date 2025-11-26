"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "flash" | "complete">("loading");

    useEffect(() => {
        // Progress animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setPhase("flash");
                    setTimeout(() => {
                        setPhase("complete");
                        setTimeout(onComplete, 300);
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== "complete" && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                >
                    {/* Flash effect */}
                    {phase === "flash" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0, 1, 0] }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-white"
                        />
                    )}

                    {/* Loading content */}
                    {phase === "loading" && (
                        <>
                            {/* Main title */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-16"
                            >
                                <h1
                                    className="text-[12vw] sm:text-[10vw] font-black tracking-tighter uppercase text-white"
                                    style={{
                                        transform: "scaleY(1.8)",
                                        fontFamily: "Impact, 'Arial Black', sans-serif",
                                        letterSpacing: "0.05em"
                                    }}
                                >
                                    <span>AUGER</span>
                                </h1>
                                <div className="text-xs sm:text-sm tracking-[0.8em] text-white/60 font-mono mt-2">
                                    AUGERBOT96 LOADING
                                </div>
                            </motion.div>

                            {/* Progress bar */}
                            <div className="w-[80vw] sm:w-[400px] space-y-4">
                                <div className="h-1 bg-white/20 relative overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white absolute top-0 left-0"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>

                                {/* Progress percentage */}
                                <div className="flex justify-between text-white font-mono text-xs">
                                    <span>LOADING...</span>
                                    <span>{progress}%</span>
                                </div>

                                {/* System messages */}
                                <div className="text-white/40 font-mono text-[10px] h-12 overflow-hidden">
                                    {progress > 20 && <div>▸ CONNECTING TO AUGER-NET...</div>}
                                    {progress > 40 && <div>▸ WE GOING LIVE...</div>}
                                    {progress > 60 && <div>▸ I LOVE AUGER...</div>}
                                    {progress === 100 && <div className="text-white">▸ READY</div>}
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-8 left-8 text-white/40 font-mono text-xs">
                                v2.0.24
                            </div>
                            <div className="absolute bottom-8 right-8 text-white/40 font-mono text-xs">
                                EST.2020
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
