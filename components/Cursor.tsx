"use client";
import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small dot that sticks to the pointer and a ring that follows with a
 * soft delay. The ring grows over links/buttons and over project previews.
 * Only runs on devices with a real mouse; touch screens keep their normal behaviour.
 */
export default function Cursor({ paused }: { paused: boolean }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    const d = dot.current!, r = ring.current!;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; root.classList.add("has-cursor"); }
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      const t = e.target as Element | null;
      const link = !!t?.closest("a,button,[role=button],summary,.shots img");
      const view = !!t?.closest(".warp");
      r.dataset.state = link ? "link" : view ? "view" : "";
    };
    const leave = () => { root.classList.remove("has-cursor"); shown = false; };
    const down = () => (r.dataset.press = "1");
    const up = () => delete r.dataset.press;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const k = pausedRef.current ? 1 : 0.18;
      rx += (x - rx) * k; ry += (y - ry) * k;
      r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down); addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move); removeEventListener("pointerdown", down); removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave); root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true"><span /></div>
      <div ref={dot} className="cur-dot" aria-hidden="true"><span /></div>
    </>
  );
}
