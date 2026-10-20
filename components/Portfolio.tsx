"use client";
import { useEffect, useState } from "react";
import GridHero from "./GridHero";
import HeroName from "./HeroName";
import ProjectRow from "./ProjectRow";
import Cursor from "./Cursor";
import {
  ABOUT_STACK_LABEL, CLOSE, EMAIL, GMAIL_COMPOSE, MENU, PHONE, PROFILE, PROJECTS, SERVICES, SKIP, STACK, UI, WA, type Lang,
} from "@/lib/data";

type Theme = "dark" | "light";

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("fr");
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [lb, setLb] = useState<{ src: string; alt: string } | null>(null);
  const [pfp, setPfp] = useState(false);
  const [touch, setTouch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // restore saved preferences (theme is already applied before paint by the inline script in layout)
  useEffect(() => {
    try {
      const t = document.documentElement.dataset.theme as Theme | undefined;
      if (t === "dark" || t === "light") setTheme(t);
      const l = localStorage.getItem("lang") as Lang | null;
      if (l === "fr" || l === "en") setLang(l); else if (navigator.language.toLowerCase().startsWith("en")) setLang("en");
      if (localStorage.getItem("motion") === "off") setPaused(true);
    } catch {}
    setTouch(!matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  useEffect(() => { const im = new Image(); im.onload = () => setPfp(true); im.src = PROFILE.photo; }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; document.title = UI.title[lang]; }, [lang]);
  useEffect(() => { document.documentElement.dataset.motion = paused ? "off" : "on"; }, [paused]);

  const save = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };

  // scroll reveal, progress bar, header state
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    els.forEach((n) => io.observe(n));
    const bar = document.getElementById("bar")!;
    let ticking = false;
    const on = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
        setScrolled(scrollY > 24);
        ticking = false;
      });
    };
    on(); addEventListener("scroll", on, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", on); };
  }, []);

  // lightbox
  useEffect(() => {
    if (!lb) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setLb(null);
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [lb]);

  // mobile menu
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const r = () => innerWidth > 820 && setMenu(false);
    addEventListener("keydown", k); addEventListener("resize", r);
    return () => { removeEventListener("keydown", k); removeEventListener("resize", r); document.body.style.overflow = ""; };
  }, [menu]);

  // scroll spy
  useEffect(() => {
    const ids = ["projets", "services", "about", "contact"];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const n = document.getElementById(id); if (n) io.observe(n); });
    const hero = document.getElementById("top");
    const ho = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" });
    if (hero) ho.observe(hero);
    return () => { io.disconnect(); ho.disconnect(); };
  }, []);

  const nav: [string, string][] = [["projets", UI.nav.projects[lang]], ["services", UI.nav.services[lang]], ["about", UI.nav.about[lang]], ["contact", UI.nav.contact[lang]]];
  // desktop: open Gmail's compose window with my address filled in; phones/tablets keep mailto so the Gmail app opens
  const openGmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const w = window.open(GMAIL_COMPOSE, "_blank");
    if (w) w.opener = null; else location.href = `mailto:${EMAIL}`; // popup blocked: fall back to mailto
  };
  const toggleMotion = () => { const v = !paused; setPaused(v); save("motion", v ? "off" : "on"); };
  const toggleLang = () => { const v: Lang = lang === "fr" ? "en" : "fr"; setLang(v); save("lang", v); };
  const toggleTheme = () => { const v: Theme = theme === "dark" ? "light" : "dark"; setTheme(v); save("theme", v); };

  return (
    <>
      <Cursor paused={paused} />
      <a className="skip" href="#projets">{SKIP[lang]}</a>
      <div id="bar" aria-hidden="true" />

      {/* hover distortion used by the project previews */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <filter id="warp" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="4" result="n">
            <animate attributeName="baseFrequency" dur="7s" values="0.012 0.03;0.02 0.012;0.012 0.03" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <header className={scrolled ? "scrolled" : undefined}>
        <div className="wrap bar-in">
          <a className="logo" href="#top" onClick={() => setMenu(false)}><span className="mark" aria-hidden="true" />amine.bouzid</a>
          <nav className="dnav" aria-label="Navigation">
            {nav.map(([h, t]) => <a key={h} href={`#${h}`} className={active === h ? "on" : undefined} aria-current={active === h ? "true" : undefined}>{t}</a>)}
          </nav>
          <div className="tools">
            <button onClick={toggleMotion} aria-pressed={paused} className="hide-sm">{paused ? UI.motionOff[lang] : UI.motionOn[lang]}</button>
            <button onClick={toggleLang} aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}>{lang === "fr" ? "EN" : "FR"}</button>
            <button onClick={toggleTheme} aria-label={UI.theme[lang]} className="icon-btn">{theme === "dark" ? "☀" : "☾"}</button>
            <button className="burger" aria-label={menu ? CLOSE[lang] : MENU[lang]} aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu(!menu)}><span /><span /></button>
          </div>
        </div>
        <div id="mnav" className={"mnav" + (menu ? " open" : "")} aria-hidden={!menu}>
          <nav aria-label={MENU[lang]}>
            {nav.map(([h, t], i) => <a key={h} href={`#${h}`} tabIndex={menu ? 0 : -1} onClick={() => setMenu(false)} style={{ transitionDelay: `${60 + i * 50}ms` }}>{t}</a>)}
            <button onClick={toggleMotion} tabIndex={menu ? 0 : -1} aria-pressed={paused} className="mpause">{paused ? UI.motionOff[lang] : UI.motionOn[lang]}</button>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <GridHero paused={paused} />
          <div className="hero-fade" aria-hidden="true" />
          <div className="wrap hero-in">
            <p className="avail"><span className="pulse" aria-hidden="true" />{UI.avail[lang]}</p>
            <HeroName lines={["Amine", "Bouzid"]} paused={paused} />
            <div className="hero-foot">
              <div>
                <p className="role">{UI.role[lang]}</p>
                <p className="sub">{UI.sub[lang]}</p>
              </div>
              <div className="btns">
                <a className="btn main" href="#projets">{UI.cta1[lang]}</a>
                <a className="btn" href={WA} target="_blank" rel="noopener noreferrer">{UI.cta2[lang]}</a>
              </div>
            </div>
          </div>
          <p className="hint" aria-hidden="true">{touch ? UI.hintTouch[lang] : UI.hint[lang]}</p>
        </section>

        <section id="projets"><div className="wrap">
          <h2 className="reveal">{UI.projectsH[lang]}</h2>
          <div className="projects">{PROJECTS.map((p, i) => <ProjectRow key={p.name} p={p} i={i} lang={lang} onOpen={(src, alt) => setLb({ src, alt })} />)}</div>
        </div></section>

        <section id="services"><div className="wrap">
          <h2 className="reveal">{UI.servicesH[lang]}</h2>
          <div className="svcs">{SERVICES.map((s, i) => (
            <div className="svc reveal" key={i} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <h3>{s.t[lang]}</h3><p>{s.d[lang]}</p>
            </div>))}
          </div>
          <p className="note">{UI.other[lang]} <a className="visit" href="#contact">{UI.describe[lang]}</a></p>
        </div></section>

        <section id="about"><div className="wrap two">
          <h2 className="reveal">{UI.aboutH[lang]}</h2>
          <div className="reveal">
            {pfp && /* eslint-disable-next-line @next/next/no-img-element */ <img className="pfp" src={PROFILE.photo} alt="Amine Bouzid" />}
            <p className="lead">{UI.about1[lang]}</p>
            <p className="mut">{UI.about2[lang]}</p>
            <ul className="tags" aria-label={ABOUT_STACK_LABEL[lang]}>{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div></section>

        <section id="contact" className="contact"><div className="wrap">
          <h2 className="reveal">{UI.contactH[lang]}</h2>
          <a className="big reveal" href={`mailto:${EMAIL}`} onClick={openGmail}><span>{EMAIL}</span><i aria-hidden="true">↗</i></a>
          <a className="big reveal" href={WA} target="_blank" rel="noopener noreferrer"><span>{UI.whatsapp[lang]} : {PHONE}</span><i aria-hidden="true">↗</i></a>
          <a className="big reveal" href="tel:+21642283007"><span>{UI.call[lang]} : {PHONE}</span><i aria-hidden="true">↗</i></a>
        </div></section>
      </main>
      <footer><div className="wrap">{UI.footer[lang]}</div></footer>

      {lb && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={lb.alt} onClick={() => setLb(null)}>
          <button className="lb-x" aria-label={CLOSE[lang]} autoFocus>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lb.src} alt={lb.alt} />
        </div>
      )}
    </>
  );
}
