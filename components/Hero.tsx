"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Content */}
            <div className="z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-[15vw] sm:text-[12vw] font-black tracking-tighter uppercase text-white mb-4"
                    style={{
                        transform: "scaleY(1.8)",
                        fontFamily: "Impact, 'Arial Black', sans-serif",
                        letterSpacing: "0.05em"
                    }}
                >
                    <span>AUGER</span>
                    <span className="text-zinc-600">96</span>
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
