/* ============================================
   REVIEW FLOW — Client Config
   ============================================
   HOW TO ADD A CLIENT:
   1. Add a new key under CLIENTS
   2. Set logo: null (or a valid img path/URL)
   3. Visit: ?client=YOUR_KEY
   ============================================ */

const CLIENTS = {
  smileclinic: {
    name: "Saluja Dentals",
    logo: null,           // Set to image path/URL if you have one, e.g. "logos/saluja.png"
    logoText: "😁 Smile",
    primaryColor: "#2563eb",
    accentColor: "#1d4ed8",
    reviewLink: "https://g.page/r/example-smile-dental/review",
    location: "Kanpur",
    tagline: "Your smile is our priority",
    services: [
      "Teeth Cleaning",
      "Dental Checkup",
      "Teeth Whitening",
      "Braces / Aligners",
      "Root Canal",
      "Tooth Extraction",
      "Dental Implants",
      "Cavity Filling",
    ],
    highlights: [
      "Best Dentist",
      "Top Dentist",
      "Friendly staff",
      "Experienced doctor",
      "Painless treatment",
      "Clean clinic",
      "Advanced equipment",
      "Professional team",
    ],
  },

  greenleaf: {
    name: "Green Leaf Ayurveda",
    logo: null,
    logoText: "🌿 GreenLeaf",
    primaryColor: "#16a34a",
    accentColor: "#15803d",
    reviewLink: "https://g.page/r/example-greenleaf/review",
    location: "Bengaluru",
    tagline: "Ancient wisdom, modern healing",
    services: [
      "Panchakarma",
      "Abhyanga Massage",
      "Shirodhara",
      "Consultation",
      "Herbal Treatment",
      "Yoga Therapy",
      "Detox Program",
      "Skin Care",
    ],
    highlights: [
      "Friendly staff",
      "Expert practitioners",
      "Authentic treatments",
      "Clean & hygienic",
      "Peaceful environment",
      "Personalized care",
      "Natural products",
      "Experienced doctors",
    ],
  },

  luxcuts: {
    name: "LuxCuts Salon",
    logo: null,
    logoText: "✂️ LuxCuts",
    primaryColor: "#7c3aed",
    accentColor: "#6d28d9",
    reviewLink: "https://g.page/r/example-luxcuts/review",
    location: "Delhi",
    tagline: "Where style meets luxury",
    services: [
      "Haircut & Styling",
      "Hair Color",
      "Highlights & Balayage",
      "Keratin Treatment",
      "Facial",
      "Manicure & Pedicure",
      "Makeup",
      "Bridal Package",
    ],
    highlights: [
      "Talented stylists",
      "Premium products",
      "Trendy styles",
      "Relaxing ambiance",
      "On-time service",
      "Clean & hygienic",
      "Friendly staff",
      "Great value",
    ],
  },

  nexa: {
    name: "Nexaflow SEO",
    logo: null,
    logoText: "⭐ NF",
    primaryColor: "#6366f1",
    accentColor: "#4f46e5",
    reviewLink: "https://g.page/r/CU_ec56h8inPEBM/review",
    location: "Lucknow",
    tagline: "Your Digital Profile Partner",
    services: [
      "GBP Boost Lite",
      "GBP Boost Pro",
      "Growth Package",
      "Premium Package",
      "Website SEO",
      "Web Development",
    ],
    highlights: [
      "Friendly staff",
      "Professional team",
      "Best SEO Agency",
      "Clean environment",
      "Quick service",
      "Great experience",
      "Excellent support",
      "Value for money",
    ],
  },
};

function getClient(id) {
  return CLIENTS[id] || CLIENTS["nexa"];
}