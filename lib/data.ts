export type Lang = "fr" | "en";
export type L = Record<Lang, string>;

export const PROFILE = { photo: "/assets/profile.jpg" };
export const EMAIL = "amime.bouzid07@gmail.com";
export const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("Projet web")}`;
export const PHONE = "+216 42 283 007";
export const WA = "https://wa.me/21642283007";

export const PROJECTS: {
  name: string; kind: L; desc: L; result: L; tags: string[]; url: string; shots: string[]; year: string; bg: string; fg: string; host: string;
}[] = [
  {
    name: "Seniors Care", year: "2026", bg: "#0f6b62", fg: "#e6fffb", host: "seniorscare.vercel.app",
    kind: { fr: "Réservation en ligne et tableau de bord", en: "Online booking and dashboard" },
    desc: {
      fr: "Site pour le service de soins à domicile de ma tante : les familles, y compris à l’étranger, réservent en ligne et l’équipe gère les demandes depuis un espace d’administration.",
      en: "Website for my aunt’s home care service: families, including those abroad, book online and the team manages requests from an admin area.",
    },
    result: {
      fr: "Prototype en ligne : 6 services, réservation avec suivi des statuts, gestion des clients et des messages.",
      en: "Live prototype: 6 services, booking with status tracking, client and message management.",
    },
    tags: ["Next.js", "TypeScript", "Neon", "Drizzle"],
    url: "https://seniorscare.vercel.app/",
    shots: ["/assets/seniorscare-1.png", "/assets/seniorscare-2.png", "/assets/seniorscare-mobile.png"],
  },
  {
    name: "Stikky", year: "2026", bg: "#ffd23f", fg: "#1a1200", host: "stikkyv252.vercel.app",
    kind: { fr: "Marque de posters et boutique en ligne", en: "Poster brand and online store" },
    desc: {
      fr: "Marque de posters et stickers encadrés : boutique en ligne avec catalogue, commandes personnalisées, packaging et publicités sur les réseaux.",
      en: "Framed poster and sticker brand: online store with a catalogue, custom orders, packaging and social media ads.",
    },
    result: {
      fr: "Catalogue de plus de 400 produits. Environ 40 000 personnes touchées en une semaine pour 1 $ de publicité par jour (portée, pas ventes).",
      en: "Catalogue of 400+ products. About 40,000 people reached in one week for $1 a day in ads (reach, not sales).",
    },
    tags: ["E-commerce", "Next.js", "Publicité sociale"],
    url: "https://stikkyv252.vercel.app/",
    shots: ["/assets/stikky-1.png", "/assets/stikky-2.png", "/assets/stikky-mobile.png"],
  },
  {
    name: "NOCT.", year: "2026", bg: "#0a0a0a", fg: "#f5f5f5", host: "noct-store-phi.vercel.app",
    kind: { fr: "Marque de streetwear technique", en: "Technical streetwear brand" },
    desc: {
      fr: "Marque de streetwear de nuit : identité noir et blanc, premier drop de 4 T-shirts et boutique en ligne avec paiement à la livraison.",
      en: "Night-themed streetwear: black and white identity, a first drop of 4 T-shirts and an online store with cash on delivery.",
    },
    result: {
      fr: "Boutique en ligne publiée : T-shirts à 55 TND, livraison dans toute la Tunisie, page de suivi de commande.",
      en: "Live online store: T-shirts at 55 TND, delivery across Tunisia, order tracking page.",
    },
    tags: ["Branding", "Photoshop", "Boutique en ligne"],
    url: "https://noct-store-phi.vercel.app/",
    shots: ["/assets/noct-1.png", "/assets/noct-2.png", "/assets/noct-mobile.png"],
  },
];

export const SERVICES: { t: L; d: L }[] = [
  { t: { fr: "Sites vitrines et boutiques", en: "Showcase sites and stores" },
    d: { fr: "Un site rapide et clair sur mobile, avec catalogue, commande ou paiement à la livraison si besoin.", en: "A fast, mobile-friendly site, with a catalogue, ordering or cash on delivery if needed." } },
  { t: { fr: "Tableaux de bord et rapports", en: "Dashboards and reports" },
    d: { fr: "Vos chiffres au même endroit : demandes, ventes, activité, avec export CSV.", en: "Your numbers in one place: requests, sales, activity, with CSV export." } },
  { t: { fr: "Identité visuelle et design", en: "Visual identity and design" },
    d: { fr: "Logo, affiches, visuels pour les réseaux sociaux et packaging pour une marque cohérente.", en: "Logos, posters, social media visuals and packaging for a consistent brand." } },
  { t: { fr: "Automatisation et intégrations", en: "Automation and integrations" },
    d: { fr: "Formulaires, notifications, exports et connexions entre vos outils pour gagner du temps.", en: "Forms, notifications, exports and connections between your tools to save time." } },
  { t: { fr: "Maintenance et évolution", en: "Maintenance and updates" },
    d: { fr: "Corrections, mises à jour et nouvelles fonctions après la livraison.", en: "Fixes, updates and new features after delivery." } },
  { t: { fr: "Application sur mesure", en: "Custom web apps" },
    d: { fr: "Réservation, gestion des clients, suivi des commandes : des outils adaptés à votre activité.", en: "Booking, client management, order tracking: tools adapted to your business." } },
];

export const UI = {
  nav: { projects: { fr: "Projets", en: "Projects" }, services: { fr: "Services", en: "Services" }, about: { fr: "À propos", en: "About" }, contact: { fr: "Contact", en: "Contact" } },
  role: { fr: "Développeur web et designer, basé en Tunisie", en: "Web developer and designer, based in Tunisia" },
  sub: {
    fr: "Je conçois des sites, des boutiques en ligne et des outils de réservation sur mesure pour les commerces, les marques locales et les établissements de soins.",
    en: "I build custom websites, online stores and booking tools for businesses, local brands and care providers.",
  },
  cta1: { fr: "Voir mes projets", en: "See my projects" },
  cta2: { fr: "Écrire sur WhatsApp", en: "Message me on WhatsApp" },
  hint: { fr: "Bougez la souris : la grille réagit", en: "Move your cursor: the grid reacts" },
  hintTouch: { fr: "Touchez la grille", en: "Touch the grid" },
  avail: { fr: "Disponible pour de nouveaux projets", en: "Available for new projects" },
  projectsH: { fr: "Des projets que j’ai conçus et construits.", en: "Projects I designed and built." },
  servicesH: { fr: "Ce que je peux construire pour vous.", en: "What I can build for you." },
  aboutH: { fr: "Qui je suis.", en: "Who I am." },
  about1: {
    fr: "Je suis développeur web et étudiant en informatique. Je conçois et je construis des sites, des boutiques en ligne et des outils de gestion avec Next.js, TypeScript, Tailwind et PostgreSQL.",
    en: "I’m a web developer and computer science student. I design and build websites, online stores and management tools with Next.js, TypeScript, Tailwind and PostgreSQL.",
  },
  about2: {
    fr: "Chaque livraison est vérifiée avant de vous être remise, et je reste disponible après pour les modifications.",
    en: "Every delivery is checked before it reaches you, and I stay available afterwards for changes.",
  },
  contactH: { fr: "Parlons de votre projet.", en: "Let’s talk about your project." },
  visit: { fr: "Voir le site", en: "Visit the site" },
  other: { fr: "Votre besoin n’est pas dans la liste ?", en: "Don’t see what you need?" },
  describe: { fr: "Décrivez-le-moi.", en: "Tell me about it." },
  theme: { fr: "Changer de thème", en: "Change theme" },
  motionOn: { fr: "Pause animations", en: "Pause motion" },
  motionOff: { fr: "Reprendre animations", en: "Resume motion" },
  whatsapp: { fr: "WhatsApp", en: "WhatsApp" },
  call: { fr: "Appeler", en: "Call" },
  stack: { fr: "Stack", en: "Stack" },
  footer: { fr: "© 2026 Amine Bouzid, Tunisie", en: "© 2026 Amine Bouzid, Tunisia" },
  title: { fr: "Amine Bouzid, développeur web", en: "Amine Bouzid, web developer" },
};

export const ABOUT_STACK_LABEL = { fr: "Outils", en: "Tools" };
export const MENU = { fr: "Menu", en: "Menu" };
export const CLOSE = { fr: "Fermer", en: "Close" };
export const SKIP = { fr: "Aller au contenu", en: "Skip to content" };
export const SHOTS = { fr: "Captures d’écran", en: "Screenshots" };

export const STACK = ["Next.js", "TypeScript", "React", "Tailwind", "PostgreSQL", "Drizzle", "Vercel", "Photoshop"];
