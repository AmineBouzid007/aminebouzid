export default function Home() {
  return (
    <>
<div id="bar"></div><div id="cur"></div><div id="ring"></div>
<header><div className="wrap">
<a className="logo" href="#top">amine.bouzid studio</a>
<nav id="nav" aria-label="Navigation"><a href="#projets"><span className="rl"><span data-t="Projets">Projets</span></span></a><a href="#services"><span className="rl"><span data-t="Services">Services</span></span></a><a href="#about"><span className="rl"><span data-t="À propos">À propos</span></span></a><a href="#contact"><span className="rl"><span data-t="Contact">Contact</span></span></a></nav>
<div className="tools"><button id="fr" aria-pressed="true">FR</button><button id="en" aria-pressed="false">EN</button><button id="mo" aria-pressed="false">Pause animations</button><button id="th" aria-label="Changer de thème">Thème</button></div>
</div></header>
<main id="top">
<div className="wrap hero">
<h1 className="hero-name">Amine Bouzid</h1>
<p className="sub sw ld">Développeur web en Tunisie. Je conçois des sites, des boutiques en ligne et des outils de réservation sur mesure pour les commerces, les marques locales et les établissements de soins.</p>
<div className="btns"><a className="btn main" href="#projets"><span className="rl"><span data-t="Voir mes projets">Voir mes projets</span></span></a><a className="btn" href="https://wa.me/21642283007"><span className="rl"><span data-t="Écrire sur WhatsApp">Écrire sur WhatsApp</span></span></a></div>
</div>

<section id="projets"><div className="wrap">
<h2 className="rv"><span>Des projets que j’ai conçus et construits.</span></h2>
<div className="grid" id="projects"></div></div></section>

<section id="services"><div className="wrap">
<h2 className="rv"><span>Ce que je peux construire pour vous.</span></h2>
<div className="grid s3">
<div className="svc"><h3>Sites vitrines et boutiques en ligne</h3><p>Un site rapide et clair sur mobile, avec catalogue, commande ou paiement à la livraison si besoin.</p></div>
<div className="svc"><h3>Tableaux de bord et rapports</h3><p>Vos chiffres au même endroit : demandes, ventes, activité, avec export CSV.</p></div>
<div className="svc"><h3>Identité visuelle et design</h3><p>Logo, affiches, visuels pour les réseaux sociaux et packaging pour une marque cohérente.</p></div>
<div className="svc"><h3>Automatisation et intégrations</h3><p>Formulaires, notifications, exports et connexions entre vos outils pour gagner du temps.</p></div>
<div className="svc"><h3>Maintenance et évolution</h3><p>Corrections, mises à jour et nouvelles fonctions après la livraison.</p></div>
</div><p className="note">Votre besoin n’est pas dans la liste ? <a className="visit" href="#contact">Décrivez-le-moi.</a></p></div></section>

<section id="about"><div className="wrap two">
<h2 className="rv"><span>Qui je suis.</span></h2>
<div><img id="pfp" className="pfp" alt="Amine Bouzid" hidden />
<p className="sw sc">Je suis développeur web et étudiant en informatique. Je conçois et je construis des sites, des boutiques en ligne et des outils de gestion avec Next.js, TypeScript, Tailwind et PostgreSQL.</p>
<p style={{ color: "var(--mut)" }}>Chaque livraison est vérifiée avant de vous être remise, et je reste disponible après pour les modifications.</p></div>
</div></section>

<section id="contact" className="contact"><div className="wrap">
<h2 className="rv"><span>Parlons de votre projet.</span></h2>
<a className="big" href="mailto:amime.bouzid07@gmail.com">amime.bouzid07@gmail.com</a>
<a className="big" href="https://wa.me/21642283007">WhatsApp : +216 42 283 007</a>
<a className="big" href="tel:+21642283007">Appeler : +216 42 283 007</a>
</div></section>
</main>
<footer><div className="wrap">© 2026 Amine Bouzid · Tunisie</div></footer>
    </>
  );
}
