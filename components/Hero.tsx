"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[40vh] md:h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Content */}
            <div className="z-10 text-center px-2 w-full">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-[20vw] sm:text-[12vw] font-black tracking-tighter uppercase text-white mb-0 md:mb-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-white hover:via-zinc-400 hover:to-zinc-600 hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] cursor-default select-none"
                    style={{
                        transform: "scaleY(1.8)",
                        fontFamily: "Impact, 'Arial Black', sans-serif",
                        letterSpacing: "0.05em"
                    }}
                >
                    <span>AUGER</span>
                </motion.h1>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 left-4 text-xs text-white/30 font-mono">
                WE LOVE AUGER
            </div>
            <div className="absolute top-4 right-4 text-xs text-white/30 font-mono text-right">
                EST. 2020
            </div>
        </section>
    );
}
