/* ═══════════════════════════════════════════════════════════
   REVIEWFLOW — Client Config  (production v3)

   ADD A NEW CLIENT:
   1. Copy any existing block below
   2. Give it a unique key (e.g. "myclinic")
   3. Update all fields — especially reviewLink
   4. Share the QR/URL:  /review?client=myclinic

   LOGO: set logo to an image path (e.g. "assets/logos/x.png")
         or leave as null to use the emoji fallback.

   COLORS: use https://coolors.co to pick a nice pair.
           primaryGlow should be the primary color at ~25% opacity.
   ═══════════════════════════════════════════════════════════ */

const RF_CLIENTS = {

  /* ── DENTAL ─────────────────────────────────────────────── */
   saluja: {
    id:             "saluja",
    name:           "Saluja Dento Max Fac Centre",
    tagline:        "Painless dentistry, beautiful smiles",
    alternateNames: [
      "Saluja Dentals",
      "Saluja Dental Clinic",
      "Saluja Dental Centre",
      "saluja dentist",
    ],
    logoText:    "🦷",
    logo:        "salujaicon.png",
    primaryColor: "#0ea5e9",
    primaryDark:  "#0284c7",
    primarySoft:  "rgba(14,165,233,0.10)",
    primaryGlow:  "rgba(14,165,233,0.25)",
    reviewLink:   "https://g.page/r/CdpWv0eYAsxQEBM/review",
    location:     "Ashok Nagar, Kanpur",
    category:     "Dentist",
    geoAreas: [
      "Ashok Nagar",
      "Govind Nagar",
      "Kidwai Nagar",
      "Harsh Nagar",
      "Kakadeo",
      "Swaroop Nagar",
      "GT Road Kanpur",
    ],
services: [
      /* — Restorative — */
      "Cavity Filling",
      "Root Canal (Single Sitting)",
      "Dental Crown & Bridge",
      "Full Mouth Rehabilitation",

      /* — General & Preventive — */
      "Dental Checkup",
      "Teeth Scaling & Polishing",
      "Dental X-Ray / Digital Scan",

  /* — Surgical — */
  "Tooth Extraction",
  "Wisdom Tooth Removal",
  "Emergency / Tooth Pain",

  /* — Cosmetic — */
  "Teeth Whitening",
  "Dental Veneers",
  "Smile Design",
  "Laser Dentistry",

  /* — Orthodontic — */
  "Braces / Aligners",
  "Invisible Aligners",

  /* — Implants & Prosthetics — */
  "Dental Implants",
  "Dentures / Artificial Teeth",

  /* — Specialty — */
  "Pediatric Dentist",
  "Gum Treatment / Pyorrhea",
  "Jaw Pain / TMJ Treatment",
],
    highlights: [
      "painless procedures", "gentle approach", "best dentists",
      "modern equipment", "quick appointments", "friendly staff",
      "clean and hygienic clinic", "thorough consultation",
      "transparent pricing", "comfortable environment", "best clinic in kanpur"
    ],
  },


};

/* ── Helper ──────────────────────────────────────────────── */
function RF_getClient(id) {
  return RF_CLIENTS[id] || RF_CLIENTS.saluja;
}
