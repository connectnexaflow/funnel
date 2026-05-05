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
   REVIEW GENERATOR
   ═══════════════════════════════════════════════════════════ */
function generateReview(client, service, rating) {
  const name      = pick(client.alternateNames);
  const isPos     = rating >= 4;
  const isNeutral = rating === 3;
  const isNeg     = rating <= 2;
  const parts     = [];

  /* 1. Intro */
  parts.push(pick(PHRASES.intro)(name));

  /* 2. Service experience */
  const expPool = PHRASES.experience[rating] || PHRASES.experience[3];
  parts.push(pick(expPool)(service, name));

  /* 3. Highlights (2–3 picked randomly) */
  const count      = 2 + (chance(.42) ? 1 : 0);
  const chosen     = pickN(client.highlights, count);
  const hlPool     = isPos ? PHRASES.highlights.positive
                   : isNeutral ? PHRASES.highlights.neutral
                   : PHRASES.highlights.negative;

  if (chosen.length > 0) {
    if (chosen.length === 1) {
      parts.push(pick(hlPool)(chosen[0]));
    } else if (chance(.5)) {
      // Combine into one sentence
      const joined = chosen.slice(0, -1).join(", ") + " and " + chosen.at(-1);
      parts.push(pick([
        isPos ? `The ${joined} were all excellent.` : `The ${joined} were areas that stood out.`,
        isPos ? `Standouts were the ${joined}.` : `I noticed mixed results with the ${joined}.`,
        `Particularly notable: the ${joined}.`,
      ]));
    } else {
      // Separate sentences
      parts.push(pick(hlPool)(chosen[0]));
      if (chosen.length > 1) {
        const connector = chance(.5) ? pick(PHRASES.connectors) + " " : "";
        parts.push(connector + pick(hlPool)(chosen[1]));
      }
    }
  }

  /* 4. Second sentence (28% chance) */
  if (chance(.28)) {
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
      parts.push(pick(PHRASES.closing.positive)(name));
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
    const id    = new URLSearchParams(window.location.search).get("client") || "saluja";
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
        `<img src="${c.logo}" alt="${c.name}" style="width:100%;height:100%;object-fit:contain;padding:6px;" />`;
    }
  }

  /* ── Service chips ────────────────────────────────────── */
  function _buildServiceChips() {
    const wrap = document.getElementById("rfServiceChips");
    wrap.innerHTML = "";
    state.client.services.forEach((svc, i) => {
      const btn = document.createElement("button");
      btn.className    = "rf-chip";
      btn.textContent  = svc;
      btn.type         = "button";
      btn.style.animationDelay = (i * 0.04) + "s";
      btn.onclick = () => _selectService(svc, btn);
      wrap.appendChild(btn);
    });
  }

  function _selectService(svc, el) {
    document.querySelectorAll(".rf-chip").forEach(c => c.classList.remove("rf-selected"));
    el.classList.add("rf-selected");
    state.service = svc;
    document.getElementById("rfStep1Btn").disabled = false;
  }

  /* ── Rating ───────────────────────────────────────────── */
  function setRating(val) {
    state.rating = val;

    document.querySelectorAll(".rf-emoji-btn").forEach(btn =>
      btn.classList.toggle("rf-active", +btn.dataset.val === val)
    );

    document.querySelectorAll(".rf-star").forEach(s =>
      s.classList.toggle("rf-lit", +s.dataset.val <= val)
    );

    const isLow = val <= 2;
    document.getElementById("rfLowRatingMsg").style.display  = isLow ? "block" : "none";
    document.getElementById("rfStep2Footer").style.display   = isLow ? "none"  : "flex";
    document.getElementById("rfStep2Btn").disabled           = false;
  }

  /* ── Step Navigation ──────────────────────────────────── */
  function toStep(n) {
    if (!_validateStep(state.step)) return;

    const dir = n > state.step ? "forward" : "back";
    if (n === 3) _buildReviewPreview();

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

  /* ── Review preview ───────────────────────────────────── */
  function _buildReviewPreview() {
    const review = generateReview(state.client, state.service, state.rating);
    state.review = review;

    const ta = document.getElementById("rfReviewText");
    ta.value = review;
    _updateCharCount(review.length);

    const stars  = "★".repeat(state.rating) + "☆".repeat(5 - state.rating);
    const labels = { 5:"Excellent ✨", 4:"Good 👍", 3:"Okay 🙂", 2:"Poor 😕", 1:"Very Poor 😞" };
    document.getElementById("rfRatingBadge").innerHTML =
      `<span style="color:#f59e0b;letter-spacing:3px;font-size:1rem">${stars}</span>
       <span style="font-size:.82rem;font-weight:700;color:var(--p)">${labels[state.rating]} — ${state.service}</span>`;
  }

  function regenerate() {
    const review = generateReview(state.client, state.service, state.rating);
    state.review = review;
    const ta = document.getElementById("rfReviewText");
    ta.value = review;
    _updateCharCount(review.length);
    showToast("New version generated ✨", "info");
  }

  function onReviewInput() {
    const ta = document.getElementById("rfReviewText");
    state.review = ta.value;
    _updateCharCount(ta.value.length);
  }

  function _updateCharCount(n) {
    const el = document.getElementById("rfCharCount");
    el.textContent = n;
    el.style.color = n > 900 ? "var(--danger)" : n > 700 ? "var(--warn)" : "";
  }

  /* ── Copy + Redirect ──────────────────────────────────── */
  async function copyAndRedirect() {
    const review = document.getElementById("rfReviewText").value.trim();
    if (!review) {
      showToast("Review is empty — add some text first", "error");
      return;
    }

    const btn = document.getElementById("rfCopyBtn");
    btn.classList.add("rf-loading");
    btn.innerHTML = `
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
        <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.9" stroke-dasharray="22">
          <animateTransform attributeName="transform" type="rotate" dur=".8s"
            values="0 10 10;360 10 10" repeatCount="indefinite"/>
        </circle>
      </svg> Copying…`;

    const restoreBtn = () => {
      btn.classList.remove("rf-loading");
      btn.innerHTML = `
        <svg viewBox="0 0 20 20" fill="none" width="17" height="17">
          <rect x="7" y="7" width="10" height="11" rx="2" stroke="currentColor" stroke-width="1.9"/>
          <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
        </svg> Copy &amp; Post on Google`;
    };

    try {
      await navigator.clipboard.writeText(review);
      btn.innerHTML = "✅ Copied! Redirecting…";
      showToast("Copied! Opening Google Reviews…", "success");
      setTimeout(() => {
        window.open(state.client.reviewLink, "_blank");
        restoreBtn();
      }, 1100);
    } catch {
      try {
        const ta = document.getElementById("rfReviewText");
        ta.select();
        document.execCommand("copy");
        showToast("Copied! Opening Google…", "success");
        setTimeout(() => window.open(state.client.reviewLink, "_blank"), 1100);
      } catch {
        document.getElementById("rfManualFallback").style.display = "block";
        showToast("Please copy the text manually", "error");
      }
      restoreBtn();
    }
  }

  /* ── Private feedback ─────────────────────────────────── */
function sharePrivate() {
  window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScSYa1fBgGgaWwbB3Mu-qW1WlmrmAtyEVjrr-KtRCoUvnNPMg/viewform";
}

  return { init, toStep, setRating, regenerate, onReviewInput, copyAndRedirect, sharePrivate };
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
