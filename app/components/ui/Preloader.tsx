"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);
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
        gsap.set([blob1Ref.current, blob2Ref.current, blob3Ref.current], { scale: 0, opacity: 0 });
        gsap.set(progressLineRef.current, { scaleX: 0 });

        // 1. Reveal Blobs (Multi-layer Pop)
        tl.to([blob1Ref.current, blob2Ref.current, blob3Ref.current], {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "elastic.out(1, 0.7)",
        })

        // 2. Loading Progress & Line
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
        }, "-=0.5")

            // Animate Line concurrently
            .to(progressLineRef.current, {
                scaleX: 1,
                duration: 2.5,
                ease: "power2.inOut"
            }, "<")

            // 3. Expansion (Reveal)
            .to([textRef.current, progressLineRef.current], { opacity: 0, duration: 0.3 })
            .to([blob1Ref.current, blob2Ref.current, blob3Ref.current], {
                scale: 60,
                duration: 1.2,
                ease: "expo.inOut",
                stagger: 0.05,
            })

            // 4. Fade Out
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.4,
            });

        // Continuous Morphing
        const animateBlob = (ref: any, duration: number, delay: number) => {
            gsap.to(ref.current, {
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                duration: duration,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: delay
            });
            gsap.to(ref.current, {
                rotation: 360,
                duration: duration * 6,
                ease: "none",
                repeat: -1,
            });
        };

        animateBlob(blob1Ref, 4, 0); // Inner - Darkest
        animateBlob(blob2Ref, 5, 0.5); // Middle - Medium
        animateBlob(blob3Ref, 6, 1); // Outer - Lightest

    }, { scope: containerRef });

    if (!show) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Centered Blobs */}
            <div className="relative flex items-center justify-center">
                {/* Layer 3: Outer - Light */}
                <div
                    ref={blob3Ref}
                    className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] bg-emerald-200 dark:bg-emerald-900"
                    style={{ borderRadius: "50%" }}
                />
                {/* Layer 2: Middle - Medium */}
                <div
                    ref={blob2Ref}
                    className="absolute w-64 h-64 md:w-96 md:h-96 bg-emerald-400 dark:bg-emerald-700"
                    style={{ borderRadius: "50%" }}
                />
                {/* Layer 1: Inner - Dark */}
                <div
                    ref={blob1Ref}
                    className="relative w-48 h-48 md:w-64 md:h-64 bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center"
                    style={{ borderRadius: "50%" }}
                >
                </div>
            </div>

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
