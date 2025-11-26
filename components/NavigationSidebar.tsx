"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Link as LinkIcon, Grid } from "lucide-react";

const navItems = [
    { id: "live", label: "LIVE", icon: Tv },
    { id: "links", label: "LINKS", icon: LinkIcon },
    { id: "feed", label: "FEED", icon: Grid },
];

export default function NavigationSidebar() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // Trigger when section is in the middle 20% of viewport
            }
        );

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className={`fixed z-50 ${isMobile
                ? "bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm"
                : "left-4 top-1/2 -translate-y-1/2 flex-col"
                }`}
        >
            <div
                className={`backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-full p-2 flex ${isMobile ? "flex-row justify-between" : "flex-col gap-4"
                    }`}
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative group flex items-center justify-center p-3 rounded-full transition-all duration-300 ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />

                            {/* Tooltip for Desktop */}
                            {!isMobile && (
                                <span className="absolute left-full ml-4 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
