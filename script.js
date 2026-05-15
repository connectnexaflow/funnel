/* ═══════════════════════════════════════════════════════════
   REVIEWFLOW — Phrase Engine + App Logic  (production v3)
   No AI required. High-variation natural language generation.
   ═══════════════════════════════════════════════════════════ */

/* ── Utility ──────────────────────────────────────────────── */
const pick   = arr => arr[Math.floor(Math.random() * arr.length)];
const pickN  = (arr, n) => [...arr].sort(() => Math.random() - .5).slice(0, Math.min(n, arr.length));
const chance = p => Math.random() < p;

/* ═══════════════════════════════════════════════════════════
   PHRASE POOLS
   ═══════════════════════════════════════════════════════════ */
const PHRASES = {

/* ── INTROS ─────────────────────────────────────────────── */
  intro: [
    /* English */
    n => `Just visited ${n} and wanted to share my experience.`,
    n => `Went to ${n} recently and felt it deserved a proper review.`,
    n => `Had a visit to ${n} last week — here's what I thought.`,
    n => `I've been meaning to leave a review for ${n} for a while now.`,
    n => `Came across ${n} and decided to give it a try.`,
    n => `My experience at ${n} was genuinely worth writing about.`,
    n => `Chose ${n} based on the reviews and wasn't disappointed.`,
    n => `Visited ${n} on a recommendation from a friend.`,
    n => `Finally decided to try ${n} after seeing it mentioned a few times.`,
    n => `Was looking for a good place nearby and ended up at ${n}.`,
    n => `Took a chance on ${n} and I'm really glad I did.`,
    n => `Dropped by ${n} recently and had a memorable visit.`,
    n => `My visit to ${n} was memorable for the right reasons.`,
    n => `I was a little hesitant before visiting ${n}, but I'm glad I went.`,
    n => `${n} came up as a suggestion and it really did not disappoint.`,

    /* Hinglish */
    n => `Kaafi time se ek acha dentist dhoondh raha tha Kanpur mein — ${n} mein aake bahut acha laga.`,
    n => `Ek dost ne ${n} suggest kiya tha, aur bilkul sahi kiya.`,
    n => `Pehli baar ${n} gaya tha, lekin experience itna acha tha ki review likhna zaruri laga.`,
    n => `Suna tha ${n} ke baare mein, aaj khud ja ke dekha — disappointed nahi hua.`,
    n => `${n} ka naam kuch logo ne suggest kiya tha — finally visit kiya aur acha laga.`,
    n => `Bahut dino se dant ka dard tha, ${n} gaya aur bahut relief mila.`,
    n => `Pehle thoda hesitation tha, par ${n} jaake pata chala ye sach mein ek acha clinic hai.`,

    /* Hindi */
    n => `${n} mein apna anubhav sabke saath share karna chahta tha.`,
    n => `Kai logo ki salah par ${n} gaya — aur wakai achha laga.`,
    n => `Pehli baar ${n} gaya tha, lekin treatment aur staff dono ne bahut accha impression chhoda.`,
  ],

  /* ── SERVICE EXPERIENCE (per rating) ────────────────────── */
  experience: {
    5: [
      (s,n) => `The ${s} was absolutely top-notch — couldn't have asked for better.`,
      (s,n) => `I came in for ${s} and ${n} delivered well beyond my expectations.`,
      (s,n) => `The ${s} experience was flawless from start to finish.`,
      (s,n) => `Honestly one of the best ${s} sessions I've had anywhere.`,
      (s,n) => `The ${s} was handled with real expertise and genuine care.`,
      (s,n) => `Everything about the ${s} was first-class.`,
      (s,n) => `I've tried a few places for ${s} — ${n} is on another level.`,
      (s,n) => `The ${s} was done to perfection and the results showed it.`,
      (s,n) => `Such a smooth and impressive ${s} experience — felt genuinely looked after.`,
      (s,n) => `I left feeling really satisfied with the ${s} — it exceeded what I hoped for.`,
      (s,n) => `The ${s} was handled so professionally — you can tell the team knows their stuff.`,
      (s,n) => `Got exactly what I came for with the ${s}, and then some.`,
      (s,n) => `The quality of the ${s} at ${n} is genuinely impressive.`,
      (s,n) => `They made the whole ${s} process so easy and pleasant.`,
      (s,n) => `Came in for ${s} — left completely impressed by the quality of care.`,
      (s,n) => `The ${s} service here sets a high bar. Really satisfied.`,
      (s,n) => `${n} really nailed the ${s} — thorough, precise, and comfortable.`,
      /* "best of" GBP boosters — fire occasionally via the pool rotation */
      (s,n) => `If you're looking for the best dentist in Kanpur for ${s}, this is genuinely it.`,
      (s,n) => `Came in for ${s} — honestly the best dental experience I've had in Kanpur.`,
      (s,n) => `I've visited a few clinics in Kanpur but ${n} is clearly the best dental clinic for ${s}.`,
      (s,n) => `For ${s} in Kanpur, I don't think you'll find better than this.`,
      (s,n) => `The ${s} here reminded me why people call this the best dentist in Kanpur.`,
    ],
    4: [
      (s,n) => `The ${s} was done really well and I'm happy with the outcome.`,
      (s,n) => `Visited for ${s} and the experience was very positive overall.`,
      (s,n) => `The ${s} was handled professionally and the results were great.`,
      (s,n) => `Good solid ${s} experience — the team clearly knows what they're doing.`,
      (s,n) => `The ${s} went smoothly and I felt well taken care of.`,
      (s,n) => `Really pleased with how the ${s} turned out.`,
      (s,n) => `The ${s} was high quality — no complaints from me.`,
      (s,n) => `${n} delivered a genuinely good ${s} experience.`,
      (s,n) => `I appreciated the care put into the ${s} — well done overall.`,
      (s,n) => `Came in for ${s} and left satisfied. Would come back.`,
      (s,n) => `The ${s} experience was comfortable and the results were great.`,
      (s,n) => `The ${s} was efficient, professional, and good value.`,
      (s,n) => `Felt confident in the ${s} being done right — and it was.`,
      (s,n) => `The team took their time with the ${s} and it made a real difference.`,
      (s,n) => `Very happy with the ${s} — handled with care and competence.`,
    ],
    3: [
      (s,n) => `The ${s} was decent — not perfect but pretty satisfactory overall.`,
      (s,n) => `Had my ${s} done here. It was fine — does what it's supposed to.`,
      (s,n) => `The ${s} was okay — met expectations without really standing out.`,
      (s,n) => `Not bad for ${s} — there's room to improve but it worked out.`,
      (s,n) => `The ${s} was done alright. A few things could be smoother.`,
      (s,n) => `Average ${s} experience — okay for the price but nothing special.`,
      (s,n) => `The ${s} was passable — got the job done but wasn't exceptional.`,
      (s,n) => `Fair experience with the ${s} — some good moments, some not so much.`,
      (s,n) => `The ${s} was reasonable. Wouldn't go out of my way but it's fine.`,
      (s,n) => `Came for ${s} and it was okay — could be a bit more polished.`,
    ],
    2: [
      (s,n) => `The ${s} didn't quite meet my expectations, honestly.`,
      (s,n) => `Had the ${s} done here — it was a bit disappointing.`,
      (s,n) => `The ${s} experience was underwhelming compared to what I hoped for.`,
      (s,n) => `A few things during the ${s} didn't sit right with me.`,
      (s,n) => `Not the best experience with the ${s} — could do better.`,
      (s,n) => `The ${s} left something to be desired, unfortunately.`,
      (s,n) => `The ${s} was below what I'd expect for the price.`,
      (s,n) => `Things didn't go as hoped with my ${s} visit.`,
    ],
    1: [
      (s,n) => `My ${s} visit at ${n} wasn't a good experience overall.`,
      (s,n) => `The ${s} left me quite disappointed — I hope things improve.`,
      (s,n) => `I had issues with how the ${s} was handled from start to finish.`,
      (s,n) => `Unfortunately my ${s} visit was quite a struggle.`,
      (s,n) => `The ${s} did not meet even basic expectations for me.`,
      (s,n) => `Quite a frustrating experience with the ${s}, to be honest.`,
      (s,n) => `The ${s} here really needs a lot of work before I'd consider returning.`,
    ],
  },

  /* ── HIGHLIGHT PHRASES ───────────────────────────────────── */
  highlights: {
    positive: [
      h => `The ${h} really made a difference.`,
      h => `I especially appreciated the ${h}.`,
      h => `Really stood out to me: the ${h}.`,
      h => `What I liked most was the ${h}.`,
      h => `The ${h} was a genuine highlight.`,
      h => `You could really tell from the ${h}.`,
      h => `The ${h} made the whole visit much better.`,
      h => `Particularly impressed by the ${h}.`,
      h => `Worth mentioning the ${h} — very good.`,
      h => `The ${h} was exactly what I was hoping for.`,
    ],
    neutral: [
      h => `The ${h} was okay.`,
      h => `I noticed the ${h}, which was fair enough.`,
      h => `The ${h} was adequate.`,
      h => `Nothing wrong with the ${h}.`,
      h => `The ${h} could be better but was acceptable.`,
    ],
    negative: [
      h => `The ${h} wasn't really up to the mark.`,
      h => `I did notice issues with the ${h}.`,
      h => `The ${h} left a lot to be desired.`,
      h => `I expected more from the ${h}.`,
      h => `The ${h} needs attention.`,
    ],
  },

  /* ── CONNECTORS ──────────────────────────────────────────── */
  connectors: [
    "On top of that,", "To add to that,", "What's more,",
    "And beyond that,", "Additionally,", "I should also mention —",
    "Worth adding:", "Also worth noting,", "Another thing I noticed:",
  ],

  /* ── SECOND SENTENCES (30% chance) ──────────────────────── */
  secondSentence: {
    positive: [
      n => `The whole team at ${n} made me feel genuinely welcome.`,
      n => `Everyone I interacted with at ${n} was professional and helpful.`,
      n => `${n} clearly takes pride in the service they offer.`,
      n => `The attention to detail at ${n} is something you notice right away.`,
      n => `It's clear ${n} cares about more than just getting the job done.`,
      n => `The overall atmosphere at ${n} added to the positive experience.`,
      () => `Everything felt smooth and well-organised from start to finish.`,
      () => `The level of care shown throughout the visit was really appreciated.`,
      () => `From booking to leaving, everything was handled well.`,
      () => `Felt comfortable and in good hands the whole time.`,
      () => `No unnecessary waiting, no confusion — just good service.`,
      () => `It's the kind of experience that makes you want to come back.`,
      /* "best of" boosters */
      () => `Easily the best dental clinic in Kanpur I've been to.`,
      () => `I've been to a few dentists around Kanpur — none come close to this level.`,
      n => `${n} has earned its reputation as one of the best dental clinics in Kanpur.`,
      () => `Genuinely the best dentist in Kanpur for anyone who values quality care.`,
      () => `This is what trusted dental care in Kanpur actually looks like.`,
      () => `Sabse acha dental clinic Kanpur mein — no doubt about it.`,
      () => `Kanpur mein itna acha dentist milna mushkil hai — bahut impressed tha.`,
    ],
    neutral: [
      n => `${n} has the basics right, but a few things could be refined.`,
      () => `The experience was functional — just not particularly memorable.`,
      () => `Things were handled competently, though not exceptionally.`,
      () => `Would've appreciated a bit more attention to detail, but it was fine.`,
      () => `Not a bad visit, just not one that really stood out.`,
    ],
    negative: [
      n => `I do hope ${n} takes feedback seriously and makes improvements.`,
      () => `The potential is there, but the execution needs work.`,
      () => `I'd genuinely like to see this place improve — it has potential.`,
      () => `The basics need to be sorted before I'd feel confident recommending it.`,
      () => `Happy to revise this review if things do improve over time.`,
    ],
  },

  /* ── CLOSINGS ────────────────────────────────────────────── */
  closing: {
    positive: [
      /* English */
      n => `Would definitely recommend ${n} to anyone looking for this kind of service.`,
      n => `Highly recommend ${n} — a genuinely great experience.`,
      n => `If you're in the area and need this service, ${n} is a solid choice.`,
      n => `Will definitely be returning to ${n} when I need this again.`,
      n => `Really glad I chose ${n}. Will be back for sure.`,
      () => `Highly recommended. Worth every bit.`,
      () => `Wouldn't hesitate to come back or recommend to a friend.`,
      () => `One of the better experiences I've had in a while. Good job.`,
      () => `Very happy with the visit. Recommended without hesitation.`,
      () => `Top marks from me — would happily recommend this place.`,
      () => `Solid experience all around. Would come back without a second thought.`,
      () => `Definitely give them a try — you won't regret it.`,
      () => `Happy to recommend this to friends and family.`,
      () => `Will be returning and will be bringing friends along too.`,
      () => `Solid, reliable, and worth every rupee.`,

      /* Hinglish */
      n => `Main definitely ${n} ko apne doston aur family ko recommend karunga.`,
      n => `${n} ek baar zaroor visit karein — bahut acha experience raha.`,
      () => `Bilkul recommend karunga — paisa aur time dono worth it tha.`,
      () => `Agli baar bhi yahi aaunga, aur saath mein kisi ko bhi le aaunga.`,
      () => `Sach mein bahut acha experience raha — highly recommended.`,

      /* Hindi */
      n => `Main ${n} ko zaroor recommend karunga apne parichit logo ko.`,
      () => `Yahan ka anubhav bahut achha raha — dobara aana pakka hai.`,
      () => `Bahut santushti mili — aage bhi yahaan hi aaunga.`,
    ],
   geo: [
      (n, area) => `If you're anywhere in ${area} or nearby, this is honestly the best dental clinic in Kanpur to visit.`,
      (n, area) => `Best dentist I've found in Kanpur — and I've tried a few around ${area}.`,
      (n, area) => `People in ${area} are lucky to have a clinic like this so close.`,
      (n, area) => `Would recommend to anyone around ${area} looking for good dental care in Kanpur.`,
      (n, area) => `Genuinely one of the best dental clinics in Kanpur — worth the trip even from ${area}.`,
      (n, area) => `Asked around in ${area} for a good dentist and this name kept coming up — now I know why.`,
      (n, area) => `${area} walon ke liye to yeh best dental clinic in Kanpur hai — ekdum sahi jagah.`,
      (n, area) => `Maine ${area} aur aas paas kai clinics try kiye — yahan jaisa koi nahi.`,
      () => `Honestly the best dental experience I've had in Kanpur.`,
      () => `If you're looking for a trusted dentist in Kanpur, look no further.`,
      () => `The kind of clinic that makes you proud to say it's in Kanpur.`,
      () => `Hard to find dental care this good anywhere in Kanpur — really impressed.`,
      () => `Poore Kanpur mein best dentist — yahan ek baar zaroor aana chahiye.`,
      () => `Kanpur ka sabse acha dental clinic — yeh kehna galat nahi hoga.`,
      () => `Best dental clinic in Kanpur — hands down, no second thoughts.`,
      () => `Trusted dental care in Kanpur — this place sets the standard.`,
    ],

    neutral: [
      n => `${n} is okay for a quick visit — just manage expectations a bit.`,
      () => `Might give it another try with adjusted expectations.`,
      () => `Worth trying, but be aware it's fairly standard.`,
      () => `Fine for a one-off visit — nothing more, nothing less.`,
    ],
  },

  negativeClosing: [
    n => `I hope ${n} reads this and makes some genuine changes.`,
    n => `${n} has potential, but a lot of work to do before I'd recommend it.`,
    () => `Not something I'd recommend in its current state, unfortunately.`,
    () => `I'd wait until things improve before visiting again.`,
    () => `This one needs work. Feedback shared honestly, hoping for improvement.`,
    () => `Would not rush back, but happy to revisit this review if things change.`,
    () => `Giving an honest account here — hope the team takes it constructively.`,
    () => `Hard to recommend right now. Maybe check again in a few months.`,
    () => `A disappointing visit that I hope isn't typical for them.`,
  ],

  emojis: {
    5: ["⭐", "👌", "🙌", "💯", "✅", "🌟", "🏆"],
    4: ["👍", "✅", "😊", "🌟", "👏"],
    3: ["🙂", "👌"],
    2: ["😕"],
    1: ["😞"],
  },
};

/* ═══════════════════════════════════════════════════════════
   SERVICE → SEO KEYWORD MAP
   Each service has 2–4 natural keyword phrases that rotate.
   One fires ~35% of the time inside the experience sentence.
   Keep them conversational — never paste raw keyword strings.
   ═══════════════════════════════════════════════════════════ */
const SERVICE_KEYWORDS = {

  /* — General & Preventive — */
  "Dental Checkup": [
    "dental checkup in Kanpur",
    "thorough dental consultation in Kanpur",
    "routine dental exam here in Kanpur",
  ],
  "Teeth Scaling & Polishing": [
    "teeth scaling and polishing in Kanpur",
    "professional teeth cleaning in Kanpur",
    "scaling treatment at this dental clinic in Kanpur",
  ],
  "Dental X-Ray / Digital Scan": [
    "digital dental X-ray in Kanpur",
    "dental scan here in Kanpur",
    "digital X-ray at this clinic in Kanpur",
  ],

  /* — Restorative — */
  "Cavity Filling": [
    "cavity filling in Kanpur",
    "tooth filling at this dental clinic",
    "dental filling here in Kanpur",
  ],
  "Root Canal (Single Sitting)": [
    "single sitting root canal in Kanpur",
    "painless root canal treatment in Kanpur",
    "RCT in a single sitting here in Kanpur",
    "painless RCT at this clinic in Kanpur",
  ],
  "Dental Crown & Bridge": [
    "dental crown and bridge in Kanpur",
    "zirconia crown in Kanpur",
    "PFM crown treatment here in Kanpur",
    "crown and bridge work at this dental clinic in Kanpur",
  ],
  "Full Mouth Rehabilitation": [
    "full mouth rehabilitation in Kanpur",
    "complete dental restoration in Kanpur",
    "full mouth treatment at this clinic in Kanpur",
  ],

  /* — Surgical — */
  "Tooth Extraction": [
    "painless tooth extraction in Kanpur",
    "tooth removal here in Kanpur",
    "painless extraction at this dental clinic in Kanpur",
  ],
  "Wisdom Tooth Removal": [
    "wisdom tooth removal in Kanpur",
    "painless wisdom tooth extraction in Kanpur",
    "wisdom tooth surgery here in Kanpur",
  ],
  "Emergency / Tooth Pain": [
    "emergency dentist in Kanpur",
    "urgent dental care in Kanpur",
    "tooth pain treatment here in Kanpur",
    "emergency dental clinic in Kanpur",
  ],

  /* — Cosmetic — */
  "Teeth Whitening": [
    "teeth whitening in Kanpur",
    "professional teeth whitening in Kanpur",
    "cosmetic whitening treatment here in Kanpur",
  ],
  "Dental Veneers": [
    "dental veneers in Kanpur",
    "smile veneers at this clinic in Kanpur",
    "porcelain veneers here in Kanpur",
  ],
  "Smile Design": [
    "smile design in Kanpur",
    "smile makeover at this dental clinic in Kanpur",
    "cosmetic dentist in Kanpur",
    "smile designing here in Kanpur",
  ],
  "Laser Dentistry": [
    "laser dentistry in Kanpur",
    "laser dental treatment here in Kanpur",
    "laser gum treatment at this clinic in Kanpur",
  ],

  /* — Orthodontic — */
  "Braces / Aligners": [
    "braces treatment in Kanpur",
    "dental aligners in Kanpur",
    "orthodontic treatment here in Kanpur",
  ],
  "Invisible Aligners": [
    "invisible aligners in Kanpur",
    "Invisalign treatment in Kanpur",
    "clear aligners at this dental clinic in Kanpur",
  ],

  /* — Implants & Prosthetics — */
  "Dental Implants": [
    "dental implants in Kanpur",
    "tooth implant here in Kanpur",
    "dental implant procedure in Kanpur",
  ],
  "Dentures / Artificial Teeth": [
    "dentures in Kanpur",
    "artificial teeth fitting here in Kanpur",
    "denture clinic in Kanpur",
  ],

  /* — Specialty — */
  "Pediatric Dentist": [
    "pediatric dentist in Kanpur",
    "child dentist in Kanpur",
    "kids dental treatment here in Kanpur",
    "dentist for children in Kanpur",
  ],
  "Gum Treatment / Pyorrhea": [
    "gum treatment in Kanpur",
    "pyorrhea treatment here in Kanpur",
    "gum disease treatment at this dental clinic in Kanpur",
  ],
  "Jaw Pain / TMJ Treatment": [
    "TMJ treatment in Kanpur",
    "jaw pain treatment here in Kanpur",
    "TMJ disorder clinic in Kanpur",
  ],
};

/* Returns a keyword phrase for a service, or falls back to the bare service name */
function _servicePhrase(service) {
  const pool = SERVICE_KEYWORDS[service];
  if (pool && chance(0.35)) return pick(pool);
  return service;
}

/* ═══════════════════════════════════════════════════════════
   REVIEW GENERATOR
   3 modes picked randomly:
     short  (30%) — 2 sentences only, no highlights
     medium (45%) — intro + experience + 1 highlight + closing
     long   (25%) — intro + experience + 2 highlights + second sentence + closing
   ═══════════════════════════════════════════════════════════ */
function generateReview(client, service, rating) {
  const name      = pick(client.alternateNames);
  const isPos     = rating >= 4;
  const isNeutral = rating === 3;
  const isNeg     = rating <= 2;
  const parts     = [];

  const mode = chance(.30) ? "short" : chance(.60) ? "medium" : "long";

  /* 1. Intro — skipped in short mode 50% of the time */
  if (mode !== "short" || chance(.50)) {
    parts.push(pick(PHRASES.intro)(name));
  }

  /* 2. Service experience — uses keyword phrase ~35% of the time */
  const expPool      = PHRASES.experience[rating] || PHRASES.experience[3];
  const serviceLabel = _servicePhrase(service);
  parts.push(pick(expPool)(serviceLabel, name));

  /* short mode stops here — just 1 or 2 sentences */
  if (mode === "short") {
    if (chance(.55)) {
      // add a single closing line
      if (isPos) parts.push(pick(PHRASES.closing.positive)(name));
      else if (isNeutral) parts.push(pick(PHRASES.closing.neutral)(name));
    }
    return parts.join(" ").replace(/\s{2,}/g, " ").trim();
  }

  /* 3. Highlights */
  const hlCount  = mode === "long" ? (1 + (chance(.5) ? 1 : 0)) : 1;
  const chosen   = pickN(client.highlights, hlCount);
  const hlPool   = isPos ? PHRASES.highlights.positive
                 : isNeutral ? PHRASES.highlights.neutral
                 : PHRASES.highlights.negative;

  if (chosen.length === 1) {
    parts.push(pick(hlPool)(chosen[0]));
  } else if (chosen.length > 1) {
    if (chance(.5)) {
      const joined = chosen.slice(0, -1).join(", ") + " and " + chosen.at(-1);
      parts.push(pick([
        isPos ? `The ${joined} were both excellent.` : `The ${joined} were areas that stood out.`,
        isPos ? `Standouts: the ${joined}.`          : `I noticed issues with the ${joined}.`,
      ]));
    } else {
      parts.push(pick(hlPool)(chosen[0]));
      const connector = chance(.45) ? pick(PHRASES.connectors) + " " : "";
      parts.push(connector + pick(hlPool)(chosen[1]));
    }
  }

  /* 4. Second sentence — long mode only, 20% chance */
  if (mode === "long" && chance(.20)) {
    const pool = isPos ? PHRASES.secondSentence.positive
               : isNeutral ? PHRASES.secondSentence.neutral
               : PHRASES.secondSentence.negative;
    parts.push(pick(pool)(name));
  }

  /* 5. Closing (78% chance) */
  if (chance(.78)) {
    if (isNeg) {
      parts.push(pick(PHRASES.negativeClosing)(name));
    } else if (isPos) {
      const geoThreshold = rating === 5 ? 0.40 : 0.20;
      if (chance(geoThreshold) && client.geoAreas) {
        const area = pick(client.geoAreas);
        parts.push(pick(PHRASES.closing.geo)(name, area));
      } else {
        parts.push(pick(PHRASES.closing.positive)(name));
      }
    } else {
      const pool = chance(.55) ? PHRASES.closing.neutral : PHRASES.closing.positive;
      parts.push(pick(pool)(name));
    }
  }

  /* 6. Occasional emoji */
  if (chance(isPos ? .18 : .07)) {
    const pool = PHRASES.emojis[rating] || PHRASES.emojis[3];
    parts[parts.length - 1] += " " + pick(pool);
  }

  return parts.join(" ").replace(/\s{2,}/g, " ").trim();
}

/* ═══════════════════════════════════════════════════════════
   APP CONTROLLER
   ═══════════════════════════════════════════════════════════ */
const RF = (() => {
  const state = {
    client:  null,
    step:    1,
    service: null,
    rating:  null,
    review:  "",
  };

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    const id     = new URLSearchParams(window.location.search).get("client") || "saluja";
    state.client = RF_getClient(id);
    _applyBranding();
    _buildServiceChips();
    _updateProgress(1);
    document.title = `Rate ${state.client.name}`;
  }

  /* ── Branding ─────────────────────────────────────────── */
function _applyBranding() {
  const c = state.client;
  const r = document.documentElement;
  r.style.setProperty("--p",      c.primaryColor);
  r.style.setProperty("--p-dark", c.primaryDark);
  r.style.setProperty("--p-soft", c.primarySoft);
  r.style.setProperty("--p-glow", c.primaryGlow || c.primarySoft);

  document.getElementById("rfBusinessName").textContent = `Thank you for visiting ${c.name}`;
  document.getElementById("rfTagline").textContent      = c.tagline || "We'd love your feedback";
  document.getElementById("rfLogoEmoji").textContent    = c.logoText || "⭐";

  if (c.logo) {
    document.getElementById("rfLogoWrap").innerHTML =
      `<img src="${c.logo}" alt="${c.name}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;" />`;
  }

  // Dynamically set emoji aspect labels from client highlights

}

/* ── Service chips ────────────────────────────────────── */
  function _buildServiceChips() {
    const wrap = document.getElementById("rfServiceChips");
    wrap.innerHTML = "";

  const groupStarts = {
      "Cavity Filling":   "Restorative",
      "Dental Checkup":   "General & Preventive",
      "Tooth Extraction": "Surgical",
      "Teeth Whitening":  "Cosmetic",
      "Braces / Aligners":"Orthodontic",
      "Dental Implants":  "Implants & Prosthetics",
      "Pediatric Dentist":"Specialty",
    };

    /* scrollable chip sheet */
    const sheet = document.createElement("div");
    sheet.className = "rf-chip-sheet";

    let animIdx = 0;
    state.client.services.forEach((svc) => {
      if (groupStarts[svc]) {
        const lbl = document.createElement("div");
        lbl.className = "rf-chip-group-label";
        lbl.textContent = groupStarts[svc];
        sheet.appendChild(lbl);
      }
      const btn = document.createElement("button");
      btn.className = "rf-chip";
      btn.textContent = svc;
      btn.type = "button";
      btn.style.animationDelay = (animIdx * 0.04) + "s";
      btn.onclick = () => _selectService(svc, btn);
      sheet.appendChild(btn);
      animIdx++;
    });
    wrap.appendChild(sheet);

    /* custom service input */
    const customWrap = document.createElement("div");
    customWrap.className = "rf-custom-service-wrap";
    customWrap.innerHTML = `
      <p class="rf-custom-label">Something else? Type it below</p>
      <div class="rf-custom-row">
        <input class="rf-custom-input" id="rfCustomService" type="text"
          placeholder="e.g. Jaw pain, Gum bleeding…" maxlength="60" />
        <button class="rf-custom-btn" id="rfCustomBtn" type="button">Go →</button>
      </div>
    `;
    wrap.appendChild(customWrap);

    /* Go button — defined here inside the module so toStep() is in scope */
    document.getElementById("rfCustomBtn").onclick = () => {
      const val = document.getElementById("rfCustomService").value.trim();
      if (!val) return;
      _selectService(val, null);
    };

document.getElementById("rfCustomService").addEventListener("input", (e) => {
  const val = e.target.value.trim().toLowerCase();
  const sheet = document.querySelector(".rf-chip-sheet");
  
  // Remove previous search results
  document.querySelectorAll(".rf-chip-search-result").forEach(el => el.remove());
  
  if (!val) return;
  
  // Find matching services
  const matches = state.client.services.filter(svc =>
    svc.toLowerCase().startsWith(val)
  );
  
  if (!matches.length) return;
  
  // Insert matched chips at top of sheet
  const divider = document.createElement("div");
  divider.className = "rf-chip-group-label rf-chip-search-result";
  divider.textContent = "Matching Services";
  sheet.insertBefore(divider, sheet.firstChild);
  
  matches.reverse().forEach(svc => {
    const btn = document.createElement("button");
    btn.className = "rf-chip rf-chip-search-result";
    btn.textContent = svc;
    btn.type = "button";
    btn.onclick = () => _selectService(svc, btn);
    sheet.insertBefore(btn, sheet.firstChild);
  });
  
  sheet.scrollTop = 0;
});
     
    document.getElementById("rfCustomService").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = e.target.value.trim();
        if (!val) return;
        _selectService(val, null);
      }
    });
  }


  function _selectService(svc, el) {
    document.querySelectorAll(".rf-chip").forEach(c => c.classList.remove("rf-selected"));
    if (el) el.classList.add("rf-selected");

    const customInput = document.getElementById("rfCustomService");
    if (!el && customInput) {
      customInput.classList.add("rf-custom-selected");
    } else if (customInput) {
      customInput.classList.remove("rf-custom-selected");
      customInput.value = "";
    }

    state.service = svc;
    setTimeout(() => toStep(2), 180);
  }

  /* ── Rating ───────────────────────────────────────────── */
  function setRating(val) {
    state.rating = val;

    // Sync emoji faces
    document.querySelectorAll(".rf-emoji-btn").forEach(btn =>
      btn.classList.toggle("rf-active", +btn.dataset.val === val)
    );

    // Sync stars
    document.querySelectorAll(".rf-star").forEach(s =>
      s.classList.toggle("rf-lit", +s.dataset.val <= val)
    );

    const isLow = val <= 2;
    document.getElementById("rfLowRatingMsg").style.display = isLow ? "block" : "none";
    document.getElementById("rfStep2Footer").style.display  = isLow ? "none"  : "flex";

    if (!isLow) {
      document.getElementById("rfStep2Btn").disabled = false;
    }
  }

  /* ── Step Navigation ──────────────────────────────────── */
  function toStep(n) {
    if (!_validateStep(state.step)) return;

    const dir = n > state.step ? "forward" : "back";
    if (n === 3) _buildReviewCarousel();

    _hideStep(state.step, dir);
    state.step = n;
    _showStep(n);
    _updateProgress(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function _hideStep(n, dir) {
    const el = document.getElementById(`rfStep${n}`);
    el.classList.add("rf-step-hidden");
    el.classList.remove("rf-step-back");
    if (dir === "back") el.classList.add("rf-step-back");
  }

  function _showStep(n) {
    const el = document.getElementById(`rfStep${n}`);
    el.classList.remove("rf-step-hidden", "rf-step-back");
  }

  /* ── Validation ───────────────────────────────────────── */
  function _validateStep(n) {
    if (n === 1 && !state.service) {
      _shake("rfStep1Btn");
      showToast("Please select a service first", "error");
      return false;
    }
    if (n === 2 && !state.rating) {
      _shake("rfEmojiRow");
      showToast("Please choose your experience rating", "error");
      return false;
    }
    return true;
  }

  function _shake(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "rfShake .38s ease";
    setTimeout(() => { el.style.animation = ""; }, 400);
  }

  /* ── Progress ─────────────────────────────────────────── */
  function _updateProgress(n) {
    document.getElementById("rfProgressFill").style.width  = (n / 3 * 100) + "%";
    document.getElementById("rfProgressLabel").textContent = `Step ${n} of 3`;
  }

  /* ── Build carousel on step 3 ─────────────────────────── */
  function _buildReviewCarousel() {
    const carousel = document.getElementById("rfCarousel");
    const dotsWrap = document.getElementById("rfCarouselDots");
    if (!carousel) return;

    carousel.innerHTML = "";
    if (dotsWrap) dotsWrap.innerHTML = "";

    const stars  = "★".repeat(state.rating) + "☆".repeat(5 - state.rating);
    const labels = { 5:"Excellent ✨", 4:"Good 👍", 3:"Okay 🙂", 2:"Poor 😕", 1:"Very Poor 😞" };

    const badge = document.getElementById("rfRatingBadge");
    if (badge) {
      badge.innerHTML =
        `<span style="color:#f59e0b;letter-spacing:3px;font-size:1rem">${stars}</span>
         <span style="font-size:.82rem;font-weight:700;color:var(--p)">${labels[state.rating]} — ${state.service}</span>`;
    }

    // Generate 3 review variants
    const reviews = [];
    for (let i = 0; i < 3; i++) {
      reviews.push(generateReview(state.client, state.service, state.rating));
    }
    state.review = reviews[0];

    reviews.forEach((text, i) => {
      // Card
      const card = document.createElement("div");
      card.className = "rf-review-card";
      card.innerHTML = `
        <div class="rf-card-copied-overlay">
          <span class="rf-copied-icon">✅</span>
          <span class="rf-copied-text">Copied! Opening Google…</span>
        </div>
        <div class="rf-card-header">
          <span class="rf-card-num">Option ${i + 1}</span>
          <span class="rf-card-tap">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <rect x="7" y="7" width="10" height="11" rx="2" stroke="currentColor" stroke-width="1.9"/>
              <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
            </svg>
            Tap to post
          </span>
        </div>
        <p class="rf-card-text">${text}</p>
        <div class="rf-card-footer">
          <span class="rf-card-stars">${stars}</span>
        </div>`;

      card.onclick = () => _copyCard(card, text);
      carousel.appendChild(card);

      // Dot
      if (dotsWrap) {
        const dot = document.createElement("div");
        dot.className = "rf-dot" + (i === 0 ? " rf-dot-active" : "");
        dot.onclick = () => {
          carousel.scrollTo({ left: card.offsetLeft - 4, behavior: "smooth" });
        };
        dotsWrap.appendChild(dot);
      }
    });

    // Update dots on scroll
    carousel.addEventListener("scroll", () => {
      const dots = dotsWrap ? dotsWrap.querySelectorAll(".rf-dot") : [];
      const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle("rf-dot-active", i === index));
    });
  }

  async function _copyCard(card, text) {
    card.classList.add("rf-card-copying");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        document.getElementById("rfManualFallback").style.display = "block";
        card.classList.remove("rf-card-copying");
        return;
      }
    }
    showToast("Copied! Opening Google Reviews…", "success");
    setTimeout(() => {
      window.open(state.client.reviewLink, "_blank");
      card.classList.remove("rf-card-copying");
    }, 1200);
  }

  /* ── Private feedback ─────────────────────────────────── */
 function sharePrivate() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScSYa1fBgGgaWwbB3Mu-qW1WlmrmAtyEVjrr-KtRCoUvnNPMg/viewform?usp=publish-editor", "_blank");
}

  return { init, toStep, setRating, sharePrivate };
})();

/* ── Toast ────────────────────────────────────────────────── */
let _toastTimer = null;
function showToast(msg, type = "info") {
  const el = document.getElementById("rfToast");
  el.textContent = msg;
  el.className   = `rf-toast rf-toast-${type} rf-toast-show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("rf-toast-show"), 3200);
}

/* ── Boot ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", RF.init);
