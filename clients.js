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
      "the Saluja Dentals team",
    ],
    logoText:    "🦷",
    logo:        null,
    primaryColor: "#0ea5e9",
    primaryDark:  "#0284c7",
    primarySoft:  "rgba(14,165,233,0.10)",
    primaryGlow:  "rgba(14,165,233,0.25)",
    reviewLink:   "https://g.page/r/CdpWv0eYAsxQEBM/review",
    location:     "Kanpur",
    category:     "Dentist",
    services: [
      "Teeth Cleaning", "Dental Checkup", "Teeth Whitening",
      "Braces / Aligners", "Root Canal", "Tooth Extraction",
      "Dental Implants", "Cavity Filling", "Kids Dentistry",
      "Smile Makeover",
    ],
    highlights: [
      "painless procedures", "gentle approach", "experienced dentists",
      "modern equipment", "quick appointments", "friendly staff",
      "clean and hygienic clinic", "thorough consultation",
      "transparent pricing", "comfortable environment",
    ],
  },

  /* ── AYURVEDA / WELLNESS ─────────────────────────────────── */
  greenleaf: {
    id:             "greenleaf",
    name:           "Green Leaf Ayurveda",
    tagline:        "Ancient wisdom, modern healing",
    alternateNames: [
      "Green Leaf",
      "Green Leaf Ayurveda Centre",
      "Green Leaf Wellness",
      "the Green Leaf team",
      "Green Leaf Ayurvedic Clinic",
    ],
    logoText:    "🌿",
    logo:        null,
    primaryColor: "#16a34a",
    primaryDark:  "#15803d",
    primarySoft:  "rgba(22,163,74,0.10)",
    primaryGlow:  "rgba(22,163,74,0.25)",
    reviewLink:   "https://g.page/r/demo-greenleaf/review",
    location:     "Bengaluru",
    category:     "wellness",
    services: [
      "Panchakarma", "Abhyanga Massage", "Shirodhara",
      "Ayurvedic Consultation", "Herbal Treatment",
      "Yoga Therapy", "Detox Program", "Skin Care Treatment",
      "Stress Relief Package", "Weight Management",
    ],
    highlights: [
      "authentic Ayurvedic treatments", "experienced practitioners",
      "peaceful and calm atmosphere", "personalized treatment plans",
      "natural and organic products", "knowledgeable doctors",
      "holistic approach", "clean and serene environment",
      "detailed consultation", "genuine care and attention",
    ],
  },

  /* ── HAIR SALON ──────────────────────────────────────────── */
  luxcuts: {
    id:             "luxcuts",
    name:           "LuxCuts Salon",
    tagline:        "Where style meets luxury",
    alternateNames: [
      "LuxCuts",
      "LuxCuts Hair Studio",
      "LuxCuts Salon & Spa",
      "the LuxCuts team",
    ],
    logoText:    "✂️",
    logo:        null,
    primaryColor: "#a855f7",
    primaryDark:  "#9333ea",
    primarySoft:  "rgba(168,85,247,0.10)",
    primaryGlow:  "rgba(168,85,247,0.25)",
    reviewLink:   "https://g.page/r/demo-luxcuts/review",
    location:     "Delhi",
    category:     "salon",
    services: [
      "Haircut & Styling", "Hair Colour", "Highlights & Balayage",
      "Keratin Treatment", "Facial", "Manicure & Pedicure",
      "Makeup", "Bridal Package", "Hair Spa", "Threading & Waxing",
    ],
    highlights: [
      "skilled and talented stylists", "premium quality products",
      "latest trends and techniques", "relaxing ambiance",
      "on-time service", "clean and hygienic salon",
      "friendly and welcoming staff", "precise and neat work",
      "great value for money", "comfortable experience",
    ],
  },

  /* ── EYE CARE ────────────────────────────────────────────── */
  clearview: {
    id:             "clearview",
    name:           "ClearView Eye Care",
    tagline:        "Clarity starts here",
    alternateNames: [
      "ClearView",
      "ClearView Eye Clinic",
      "ClearView Opticals",
      "the ClearView team",
      "ClearView Eye Care Centre",
    ],
    logoText:    "👁️",
    logo:        null,
    primaryColor: "#06b6d4",
    primaryDark:  "#0891b2",
    primarySoft:  "rgba(6,182,212,0.10)",
    primaryGlow:  "rgba(6,182,212,0.25)",
    reviewLink:   "https://g.page/r/demo-clearview/review",
    location:     "Hyderabad",
    category:     "eyecare",
    services: [
      "Eye Examination", "Spectacle Fitting", "Contact Lens Trial",
      "Cataract Consultation", "LASIK Evaluation", "Diabetic Eye Check",
      "Children's Eye Test", "Retina Screening", "Glaucoma Check",
      "Frame Selection",
    ],
    highlights: [
      "thorough eye examination", "latest diagnostic equipment",
      "wide range of frames", "experienced optometrist",
      "patient and detailed consultation", "quick and accurate service",
      "transparent pricing", "friendly and helpful staff",
      "modern and clean clinic", "excellent aftercare support",
    ],
  },

  /* ── CAFÉ / RESTAURANT ───────────────────────────────────── */
  brewhaven: {
    id:             "brewhaven",
    name:           "BrewHaven Café",
    tagline:        "Your favourite corner of the day",
    alternateNames: [
      "BrewHaven",
      "BrewHaven Coffee",
      "BrewHaven Café & Bistro",
      "the BrewHaven team",
    ],
    logoText:    "☕",
    logo:        null,
    primaryColor: "#b45309",
    primaryDark:  "#92400e",
    primarySoft:  "rgba(180,83,9,0.10)",
    primaryGlow:  "rgba(180,83,9,0.25)",
    reviewLink:   "https://g.page/r/demo-brewhaven/review",
    location:     "Pune",
    category:     "cafe",
    services: [
      "Specialty Coffee", "Cold Brews", "Breakfast", "All-Day Brunch",
      "Sandwiches & Wraps", "Smoothies & Shakes", "Desserts",
      "Work-Friendly Space", "Group Bookings", "Takeaway Orders",
    ],
    highlights: [
      "excellent coffee quality", "cozy and inviting atmosphere",
      "quick and attentive service", "delicious food options",
      "comfortable seating", "great for work and meetings",
      "friendly and cheerful staff", "consistent quality",
      "good portion sizes", "clean and well-maintained space",
    ],
  },

  /* ── NEXAFLOW (agency) ───────────────────────────────────── */
  nexaflow: {
    id:             "nexaflow",
    name:           "Nexaflow SEO",
    tagline:        "Your digital growth partner",
    alternateNames: [
      "Nexaflow",
      "Nexaflow SEO",
      "Nexaflow Digital",
      "the Nexaflow team",
    ],
    logoText:    "⚡",
    logo:        null,
    primaryColor: "#6366f1",
    primaryDark:  "#4f46e5",
    primarySoft:  "rgba(99,102,241,0.10)",
    primaryGlow:  "rgba(99,102,241,0.25)",
    reviewLink:   "https://g.page/r/CU_ec56h8inPEBM/review",
    location:     "Lucknow",
    category:     "agency",
    services: [
      "GBP Boost Lite", "GBP Boost Pro",
      "Growth Package", "Premium Package",
      "Website SEO", "Web Development",
    ],
    highlights: [
      "professional and responsive team", "excellent communication",
      "results-driven approach", "transparent reporting",
      "quick turnaround", "value for money",
      "knowledgeable experts", "personalised strategy",
      "great support", "measurable improvements",
    ],
  },

  /* ── DEMO / FALLBACK ─────────────────────────────────────── */
  demo: {
    id:             "demo",
    name:           "Demo Business",
    tagline:        "We care about your experience",
    alternateNames: [
      "Demo Business",
      "this place",
      "the team here",
      "the staff",
    ],
    logoText:    "⭐",
    logo:        null,
    primaryColor: "#7c3aed",
    primaryDark:  "#5b21b6",
    primarySoft:  "rgba(124,58,237,0.10)",
    primaryGlow:  "rgba(124,58,237,0.25)",
    reviewLink:   "https://google.com",
    location:     "your area",
    category:     "general",
    services: [
      "Service One", "Service Two", "Service Three",
      "Service Four", "Service Five", "Service Six",
    ],
    highlights: [
      "quality service", "friendly staff", "professional team",
      "clean environment", "efficient process", "good communication",
    ],
  },
};

/* ── Helper ──────────────────────────────────────────────── */
function RF_getClient(id) {
  return RF_CLIENTS[id] || RF_CLIENTS.saluja;
}
