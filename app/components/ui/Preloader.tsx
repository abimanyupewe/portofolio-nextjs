"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(true);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setShow(false);
            },
        });

        // 0. Initial State
        gsap.set(progressLineRef.current, { scaleX: 0 });

        // 1. Loading Progress & Line
        const counter = { value: 0 };
        tl.to(counter, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (textRef.current) {
                    textRef.current.textContent = Math.round(counter.value) + "%";
                }
            }
        })
            // Animate Line concurrently
            .to(progressLineRef.current, {
                scaleX: 1,
                duration: 2.5,
                ease: "power2.inOut"
            }, "<")

            // 2. Fade Out Text and Line
            .to([textRef.current, progressLineRef.current], { opacity: 0, duration: 0.3 })

            // 3. Fade Out Container
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.4,
            });

    }, { scope: containerRef });

    if (!show) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Bottom Right Text */}
            <div className="absolute bottom-10 right-10 z-10">
                <div
                    ref={textRef}
                    className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-none tracking-tighter"
                >
                    0%
                </div>
            </div>

            {/* Full Width Loading Line */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-100 dark:bg-zinc-900 overflow-hidden">
                <div
                    ref={progressLineRef}
                    className="h-full bg-emerald-500 w-full origin-left"
                />
            </div>
        </div>
    );
};

export default Preloader;
