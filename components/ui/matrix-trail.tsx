"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MatrixTrailProps {
  children?: React.ReactNode;
  className?: string;
  characters?: string;
  fontSize?: number;
}

/**
 * Faint field of characters with thin lines raining down. The pointer lights characters
 * behind it and leaves a trail that fades. Colour follows the CSS `color` of the wrapper.
 * Static characters are pre-rendered once; only active cells are redrawn per frame.
 */
export const MatrixTrail = ({
  children,
  className,
  characters = "01<>/{}[]=+*;:#ABCDEFabcdef",
  fontSize = 16,
}: MatrixTrailProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = Math.round(fontSize * 1.15);

    let w = 0, h = 0, cols = 0, rows = 0;
    let glyphs: string[] = [];
    let glow = new Float32Array(0);
    let drops: { y: number; speed: number; len: number }[] = [];
    let base: HTMLCanvasElement | null = null;
    let color = "#ffffff";
    let raf = 0;
    let running = false;
    let last = { c: -1, r: -1 };

    const rand = () => characters[Math.floor(Math.random() * characters.length)];
    const font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

    const build = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      glyphs = Array.from({ length: cols * rows }, rand);
      glow = new Float32Array(cols * rows);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * rows,
        speed: 4 + Math.random() * 8,
        len: 6 + Math.random() * 12,
      }));
      color = getComputedStyle(wrap).color;

      base = document.createElement("canvas");
      base.width = w * dpr;
      base.height = h * dpr;
      const b = base.getContext("2d")!;
      b.scale(dpr, dpr);
      b.font = font;
      b.textBaseline = "top";
      b.fillStyle = color;
      b.globalAlpha = 0.07;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) b.fillText(glyphs[r * cols + c], c * cell, r * cell);
    };

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (base) ctx.drawImage(base, 0, 0, w, h);
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      // thin rain lines
      ctx.lineWidth = 1;
      for (let c = 0; c < cols; c++) {
        const d = drops[c];
        d.y += d.speed * dt;
        if (d.y - d.len > rows) {
          d.y = -Math.random() * 10;
          d.speed = 4 + Math.random() * 8;
          d.len = 6 + Math.random() * 12;
        }
        const x = c * cell + cell / 2;
        const y1 = d.y * cell;
        const g = ctx.createLinearGradient(0, y1 - d.len * cell, 0, y1);
        g.addColorStop(0, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.22;
        g.addColorStop(1, color);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, y1 - d.len * cell);
        ctx.lineTo(x, y1);
        ctx.stroke();
      }

      // pointer trail: only cells that are still glowing
      for (let i = 0; i < glow.length; i++) {
        const v = glow[i];
        if (v < 0.03) continue;
        const c = i % cols, r = (i / cols) | 0;
        ctx.globalAlpha = Math.min(1, v);
        ctx.fillStyle = color;
        ctx.fillText(glyphs[i], c * cell, r * cell);
        glow[i] = v * Math.pow(0.0006, dt); // ~0.6s to fade
        if (Math.random() < 0.02) glyphs[i] = rand();
      }
      ctx.globalAlpha = 1;
    };

    let prev = 0;
    const loop = (t: number) => {
      const dt = Math.min((t - prev) / 1000 || 0.016, 0.05);
      prev = t;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const c = Math.floor((e.clientX - rect.left) / cell);
      const r = Math.floor((e.clientY - rect.top) / cell);
      if (c < 0 || r < 0 || c >= cols || r >= rows || (c === last.c && r === last.r)) return;
      // fill the gap between samples so fast moves leave a continuous trail
      const steps = last.c < 0 ? 1 : Math.max(Math.abs(c - last.c), Math.abs(r - last.r), 1);
      for (let s = 1; s <= steps; s++) {
        const cc = last.c < 0 ? c : Math.round(last.c + ((c - last.c) * s) / steps);
        const rr = last.r < 0 ? r : Math.round(last.r + ((r - last.r) * s) / steps);
        glow[rr * cols + cc] = 1;
      }
      last = { c, r };
    };
    const onLeave = () => (last = { c: -1, r: -1 });

    build();
    if (reduced) draw(0);
    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw(0);
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [characters, fontSize]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
