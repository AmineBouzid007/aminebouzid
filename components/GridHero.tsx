"use client";
import { useEffect, useRef } from "react";

/**
 * Warp grid. A lattice of points is pushed around by the pointer (lens bulge,
 * drag along motion, click ripples). With no pointer (touch screens, idle desktop)
 * a ghost cursor drifts across the grid so it is always alive.
 */
export default function GridHero({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let W = 0, H = 0, cols = 0, rows = 0, gap = 48, dpr = 1, raf = 0, visible = true, time = 0;
    let px = -9999, py = -9999, pvx = 0, pvy = 0, active = false, lastMove = 0;
    let gx = 0, gy = 0, gs = 0; // ghost cursor + its strength
    type P = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };
    let pts: P[] = [];
    let ripples: { x: number; y: number; t: number }[] = [];

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        line: s.getPropertyValue("--grid").trim() || "rgba(27,70,196,.2)",
        major: s.getPropertyValue("--grid-major").trim() || "rgba(27,70,196,.38)",
        acc: s.getPropertyValue("--acc").trim() || "#1b46c4",
      };
    };
    let C = readColors();

    function resize() {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = W < 560 ? 36 : W < 1000 ? 44 : 52;
      cols = Math.ceil(W / gap) + 3; rows = Math.ceil(H / gap) + 3;
      const x0 = (W - (cols - 3) * gap) / 2 - gap, y0 = (H - (rows - 3) * gap) / 2 - gap;
      pts = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = x0 + i * gap, y = y0 + j * gap;
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      }
      C = readColors();
    }

    const host = cv.parentElement!;
    function move(e: PointerEvent) {
      const r = cv.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      if (active) { pvx = nx - px; pvy = ny - py; }
      px = nx; py = ny; active = true; lastMove = performance.now();
    }
    function leave(e: PointerEvent) { if (e.pointerType === "mouse") active = false; }
    function down(e: PointerEvent) {
      const r = cv.getBoundingClientRect();
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: 0 });
      if (e.pointerType !== "mouse") { px = e.clientX - r.left; py = e.clientY - r.top; active = true; lastMove = performance.now(); }
    }

    const radiusOf = () => Math.max(130, Math.min(W, H) * 0.3);

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const still = pausedRef.current || reduce.matches;
      if (!still) time += 0.012;
      // a touch/pen pointer goes quiet after a moment, then the ghost takes over
      if (active && performance.now() - lastMove > 2200) active = false;
      const radius = radiusOf();

      // ghost cursor
      const gtx = W * (0.5 + 0.36 * Math.sin(time * 0.55)), gty = H * (0.5 + 0.3 * Math.sin(time * 0.83 + 1.3));
      const ngs = !still && !active ? 0.7 : 0;
      gs += (ngs - gs) * 0.04;
      const ngx = gtx, ngy = gty;
      const gvx = ngx - gx, gvy = ngy - gy; gx = ngx; gy = ngy;

      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        let tx = p.ox, ty = p.oy;
        if (!still) {
          tx += Math.sin(p.oy * 0.011 + time * 2) * 3 + Math.cos(p.ox * 0.008 + time) * 2;
          ty += Math.cos(p.ox * 0.011 + time * 1.7) * 3;
          const probes: [number, number, number, number, number][] = [];
          if (active) probes.push([px, py, pvx, pvy, 1]);
          if (gs > 0.01) probes.push([gx, gy, gvx * 3, gvy * 3, gs]);
          for (const [qx, qy, qvx, qvy, str] of probes) {
            const dx = p.ox - qx, dy = p.oy - qy, d = Math.hypot(dx, dy);
            if (d < radius) {
              const k = 1 - d / radius, f = k * k * (3 - 2 * k) * str;
              tx += (dx / (d || 1)) * f * 40 + qvx * f * 1.5;
              ty += (dy / (d || 1)) * f * 40 + qvy * f * 1.5;
            }
          }
        }
        for (const r of ripples) {
          const dx = p.ox - r.x, dy = p.oy - r.y, d = Math.hypot(dx, dy), wave = r.t * 560;
          const w = Math.exp(-Math.pow((d - wave) / 44, 2)) * (1 - r.t);
          tx += (dx / (d || 1)) * w * 30; ty += (dy / (d || 1)) * w * 30;
        }
        p.vx += (tx - p.x) * 0.13; p.vy += (ty - p.y) * 0.13;
        p.vx *= 0.79; p.vy *= 0.79;
        p.x += p.vx; p.y += p.vy;
      }
      ripples = ripples.filter((r) => (r.t += 0.017) < 1);
      pvx *= 0.88; pvy *= 0.88;

      // cells lit around the probes
      if (!still) {
        ctx.fillStyle = C.acc;
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = pts[j * cols + i], b = pts[j * cols + i + 1], c = pts[(j + 1) * cols + i + 1], d = pts[(j + 1) * cols + i];
          const mx = (a.x + c.x) / 2, my = (a.y + c.y) / 2;
          let k = 0;
          if (active) k = Math.max(k, 1 - Math.hypot(mx - px, my - py) / radius);
          if (gs > 0.01) k = Math.max(k, (1 - Math.hypot(mx - gx, my - gy) / radius) * gs);
          if (k <= 0) continue;
          ctx.globalAlpha = Math.min(0.2, k * k * 0.22);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // lines: every 4th line is heavier, like graph paper
      for (const major of [false, true]) {
        ctx.lineWidth = major ? 1.3 : 1;
        ctx.strokeStyle = major ? C.major : C.line;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const p = pts[j * cols + i];
          if (i < cols - 1 && (j % 4 === 0) === major) { const q = pts[j * cols + i + 1]; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); }
          if (j < rows - 1 && (i % 4 === 0) === major) { const q = pts[(j + 1) * cols + i]; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); }
        }
        ctx.stroke();
      }

      // glowing nodes
      if (!still) {
        ctx.fillStyle = C.acc;
        for (const p of pts) {
          let k = 0;
          if (active) k = Math.max(k, 1 - Math.hypot(p.x - px, p.y - py) / radius);
          if (gs > 0.01) k = Math.max(k, (1 - Math.hypot(p.x - gx, p.y - gy) / radius) * gs);
          if (k <= 0) continue;
          ctx.globalAlpha = Math.min(1, k * 1.2);
          ctx.beginPath(); ctx.arc(p.x, p.y, 1 + k * 2.8, 0, 6.2832); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv);
    const mo = new MutationObserver(() => (C = readColors()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    host.addEventListener("pointermove", move); host.addEventListener("pointerdown", down);
    host.addEventListener("pointerleave", leave); host.addEventListener("pointercancel", leave);
    resize(); frame();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerleave", leave); host.removeEventListener("pointercancel", leave);
    };
  }, []);

  return <canvas ref={ref} className="grid-canvas" aria-hidden="true" />;
}
