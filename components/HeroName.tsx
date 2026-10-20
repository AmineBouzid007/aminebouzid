"use client";
import { useEffect, useRef } from "react";

/**
 * The name is set in a variable font. Each letter swells (heavier and wider) as the
 * pointer gets close; with no pointer a slow wave rolls through the letters.
 */
export default function HeroName({ lines, paused }: { lines: string[]; paused: boolean }) {
  const root = useRef<HTMLHeadingElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const el = root.current!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const state = letters.map(() => 0);
    const last = letters.map(() => -1);
    let px = -9999, py = -9999, lastMove = 0, raf = 0, visible = true, time = 0;

    const apply = (i: number, t: number) => {
      const wght = Math.round(430 + t * 370), wdth = Math.round(75 + t * 25);
      if (Math.abs(last[i] - t) < 0.004) return;
      last[i] = t;
      letters[i].style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`;
    };
    const rest = () => letters.forEach((_, i) => { last[i] = -1; apply(i, 0.55); });

    const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; lastMove = performance.now(); };
    const leave = () => { lastMove = 0; };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(el);

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (pausedRef.current || reduce.matches) { rest(); return; }
      time += 0.016;
      const live = performance.now() - lastMove < 2500;
      const rects = letters.map((l) => l.getBoundingClientRect()); // read first, write after
      const R = Math.max(180, Math.min(innerWidth * 0.3, 380));
      letters.forEach((_, i) => {
        let target: number;
        if (live) {
          const r = rects[i], d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
          const k = Math.max(0, 1 - d / R);
          target = 0.15 + 0.85 * k * k * (3 - 2 * k);
        } else {
          target = 0.5 + 0.38 * Math.sin(time * 1.4 - i * 0.65);
        }
        state[i] += (target - state[i]) * 0.14;
        apply(i, state[i]);
      });
    }
    rest(); frame();
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <h1 className="hero-name" ref={root} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span className="ln" key={li} aria-hidden="true">
          {line.split("").map((c, i) => <span key={i} data-l className="ch">{c}</span>)}
        </span>
      ))}
    </h1>
  );
}
