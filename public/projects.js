// ============================================================
//  PROJECTS.JS  -  the only file you need to edit to update the site
//  1) Put your images in the "assets" folder (png, jpg or webp)
//  2) List their paths in "shots" for each project
//  3) Text can be a string, or { fr: "...", en: "..." } for both languages
// ============================================================

// Profile photo shown in the About section.
// Put your photo at assets/profile.jpg (or change the name here).
window.PROFILE = { photo: "/assets/profile.jpg" };

window.PROJECTS = [
  {
    name: "Seniors Care",
    kind: { fr: "Réservation en ligne et tableau de bord", en: "Online booking and dashboard" },
    desc: {
      fr: "Site pour le service de soins à domicile de ma tante : les familles, y compris à l’étranger, réservent en ligne et l’équipe gère les demandes depuis un espace d’administration.",
      en: "Website for my aunt’s home care service: families, including those abroad, book online and the team manages requests from an admin area."
    },
    result: {
      fr: "Prototype en ligne : 6 services, réservation avec suivi des statuts, gestion des clients et des messages.",
      en: "Live prototype: 6 services, booking with status tracking, client and message management."
    },
    tags: ["Next.js", "TypeScript", "Neon", "Drizzle"],
    url: "https://seniorscare.vercel.app/",
    shots: ["/assets/seniorscare-1.png", "/assets/seniorscare-2.png", "/assets/seniorscare-mobile.png"]
  },
  {
    name: "Stikky",
    kind: { fr: "Marque de posters et boutique en ligne", en: "Poster brand and online store" },
    desc: {
      fr: "Marque de posters et stickers encadrés : boutique en ligne avec catalogue, commandes personnalisées, packaging et publicités sur les réseaux.",
      en: "Framed poster and sticker brand: online store with a catalogue, custom orders, packaging and social media ads."
    },
    result: {
      fr: "Catalogue de plus de 400 produits. Environ 40 000 personnes touchées en une semaine pour 1 $ de publicité par jour (portée, pas ventes).",
      en: "Catalogue of 400+ products. About 40,000 people reached in one week for $1 a day in ads (reach, not sales)."
    },
    tags: ["E-commerce", "Next.js", "Publicité sociale"],
    url: "https://stikkyv252.vercel.app/",
    shots: ["/assets/stikky-1.png", "/assets/stikky-2.png", "/assets/stikky-mobile.png"]
  },
  {
    name: "NOCT.",
    kind: { fr: "Marque de streetwear technique", en: "Technical streetwear brand" },
    desc: {
      fr: "Marque de streetwear de nuit : identité noir et blanc, premier drop de 4 T-shirts et boutique en ligne avec paiement à la livraison.",
      en: "Night-themed streetwear: black and white identity, a first drop of 4 T-shirts and an online store with cash on delivery."
    },
    result: {
      fr: "Boutique en ligne publiée : T-shirts à 55 TND, livraison dans toute la Tunisie, page de suivi de commande.",
      en: "Live online store: T-shirts at 55 TND, delivery across Tunisia, order tracking page."
    },
    tags: ["Branding", "Photoshop", "Boutique en ligne"],
    url: "https://noct-store-phi.vercel.app/",
    shots: ["/assets/noct-1.png", "/assets/noct-2.png", "/assets/noct-mobile.png"]
  }

  /* TO ADD A NEW PROJECT: copy one block above, paste it after a comma, and edit it.
     Missing images are simply hidden, so you can list them before you add the files. */
];
