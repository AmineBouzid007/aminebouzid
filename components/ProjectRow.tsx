"use client";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/data";
import { PROJECTS, SHOTS, UI } from "@/lib/data";

type P = (typeof PROJECTS)[number];

export default function ProjectRow({ p, i, lang, onOpen }: { p: P; i: number; lang: Lang; onOpen: (src: string, alt: string) => void }) {
  // a screenshot is only shown once the file is known to exist, so missing files never flash as broken images
  const [ok, setOk] = useState<Record<string, boolean>>({});
  useEffect(() => {
    p.shots.forEach((s) => {
      const im = new Image();
      im.onload = () => setOk((o) => ({ ...o, [s]: true }));
      im.src = s;
    });
  }, [p.shots]);
  const shots = p.shots.filter((s) => ok[s]);

  return (
    <article className="proj reveal" style={{ ["--pbg" as string]: p.bg, ["--pfg" as string]: p.fg }}>
      <div className="proj-media warp" role="group" aria-label={`${p.name}, ${SHOTS[lang]}`}>
        <div className="frame">
          <div className="frame-bar" aria-hidden="true"><i /><i /><i /><span>{p.host}</span></div>
          <div className="frame-body">
            {shots.length > 0 && (
              <div className="shots">
                {shots.map((s, k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s} src={s} alt={`${p.name} ${k + 1}`} onClick={() => onOpen(s, `${p.name} ${k + 1}`)} />
                ))}
              </div>
            )}
            {shots.length === 0 && <div className="ph" aria-hidden="true"><span>{p.name}</span></div>}
          </div>
        </div>
      </div>
      <div className="proj-body">
        <p className="proj-meta"><span>{p.kind[lang]}</span><span className="yr">{p.year}</span></p>
        <h3>{p.name}</h3>
        <p className="desc">{p.desc[lang]}</p>
        <p className="res">{p.result[lang]}</p>
        <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <a className="visit" href={p.url} target="_blank" rel="noopener noreferrer">{UI.visit[lang]}<span aria-hidden="true"> ↗</span><span className="sr"> ({p.name})</span></a>
      </div>
    </article>
  );
}
