/* ============================================
   REVIEW FLOW — Main Script v2
   ============================================ */

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  client: null,
  currentStep: 1,
  totalSteps: 6,
  selectedService: null,
  emojiValue: null,
  emojiWord: null,
  starRating: null,
  selectedHighlights: [],
  recommendation: null,
  personalMessage: '',
  generatedReview: '',
};

// ─── Review Templates by Rating ───────────────────────────────────────────────
const OPENERS = {
  5: [
    "Absolutely blown away by my experience at {name}!",
    "Had an outstanding visit to {name} — couldn't be happier!",
    "Five stars all the way for {name}. Truly impressed!",
  ],
  4: [
    "Really happy with my visit to {name}.",
    "Great experience at {name} — would definitely go back.",
    "Had a solid visit at {name}. Very pleased overall.",
  ],
  3: [
    "Decent visit to {name} overall.",
    "Had an okay experience at {name}.",
    "My visit to {name} was alright — nothing too exceptional.",
  ],
  2: [
    "My visit to {name} was a bit disappointing.",
    "Expected a bit more from {name}, honestly.",
    "Mixed feelings about my visit to {name}.",
  ],
  1: [
    "Unfortunately, my experience at {name} did not meet expectations.",
    "Had a poor experience at {name} and hope things improve.",
    "Not satisfied with my visit to {name}.",
  ],
};

const SERVICE_PHRASES = {
  5: "came in for {service} and the results exceeded my expectations",
  4: "came in for {service} and was genuinely impressed",
  3: "came in for {service} — it was handled reasonably well",
  2: "came in for {service}, though the results left something to be desired",
  1: "came in for {service} but was left quite dissatisfied",
};

const HIGHLIGHT_INTROS = {
  5: "What truly stood out was",
  4: "I especially appreciated",
  3: "A few things worth mentioning:",
  2: "There were some positives, like",
  1: "On the positive side, at least",
};

const REC_CLOSERS = {
  "highly recommended": [
    "I'd highly recommend {name} to anyone in {location} — truly one of the best!",
    "{name} in {location} gets my full recommendation. Will be back for sure!",
    "Don't hesitate — {name} is the place to go in {location}. Absolutely worth it!",
  ],
  "recommended": [
    "Overall, I'd recommend {name} to others in {location}.",
    "If you're in {location}, {name} is worth checking out.",
    "A decent choice for anyone looking for this service in {location}.",
  ],
  "can be improved": [
    "There's room for improvement, but {name} in {location} has potential.",
    "{name} could be better, but I appreciate that they're trying. Located in {location}.",
    "I hope the team at {name} ({location}) works on some of the rough edges.",
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fill(template, replacements) {
  return template.replace(/\{(\w+)\}/g, (_, key) => replacements[key] || '');
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('client') || 'nexa';
  state.client = getClient(clientId);
  applyBranding();
  buildServiceGrid();
  buildHighlightGrid();
  updateStepUI();
});

// ─── Branding ─────────────────────────────────────────────────────────────────
function applyBranding() {
  const c = state.client;

  document.documentElement.style.setProperty('--primary', c.primaryColor);
  document.documentElement.style.setProperty('--primary-dark', c.accentColor);
  document.documentElement.style.setProperty('--primary-light', hexToRgba(c.primaryColor, 0.08));
  document.documentElement.style.setProperty('--primary-glow', hexToRgba(c.primaryColor, 0.22));
  document.documentElement.style.setProperty('--primary-medium', hexToRgba(c.primaryColor, 0.15));

  document.getElementById('clientName').textContent = `Thank you for visiting ${c.name}`;
  document.getElementById('clientTagline').textContent = c.tagline || "We'd love your feedback";
  document.getElementById('footerClient').textContent = c.name;
  document.title = `Rate ${c.name}`;

  const logoWrap = document.getElementById('logoWrap');
  if (c.logo) {
    logoWrap.innerHTML = `<img src="${c.logo}" alt="${c.name} logo" />`;
  } else {
    document.getElementById('logoText').textContent = c.logoText || '⭐';
  }
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Build Grids ──────────────────────────────────────────────────────────────
function buildServiceGrid() {
  const grid = document.getElementById('serviceGrid');
  grid.innerHTML = '';
  state.client.services.forEach(service => {
    const div = document.createElement('div');
    div.className = 'service-card';
    div.textContent = service;
    div.onclick = () => selectService(div, service);
    grid.appendChild(div);
  });
}

function buildHighlightGrid() {
  const grid = document.getElementById('highlightGrid');
  grid.innerHTML = '';
  state.client.highlights.forEach(highlight => {
    const div = document.createElement('div');
    div.className = 'highlight-chip';
    div.textContent = highlight;
    div.onclick = () => toggleHighlight(div, highlight);
    grid.appendChild(div);
  });
}

// ─── Step Navigation ──────────────────────────────────────────────────────────
function goToStep(n) {
  if (n === state.currentStep) return;
  if (n > state.currentStep && !validateStep(state.currentStep)) return;

  const goingBack = n < state.currentStep;
  const currentEl = document.getElementById(`step${state.currentStep}`);
  const nextEl = document.getElementById(`step${n}`);

  // Remove active from current
  currentEl.classList.remove('active', 'going-back');

  // Set up next with correct animation direction
  nextEl.classList.remove('going-back');
  if (goingBack) nextEl.classList.add('going-back');
  nextEl.classList.add('active');

  state.currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateStepUI();
}

function validateStep(step) {
  if (step === 1 && !state.selectedService) {
    showToast('Please select a service to continue', 'error');
    shakeBtn('step1Next');
    return false;
  }
  if (step === 2 && !state.emojiValue) {
    showToast('Please choose your experience rating', 'error');
    shakeBtn('step2Next');
    return false;
  }
  if (step === 3 && state.selectedHighlights.length === 0) {
    showToast('Please select at least one highlight', 'error');
    shakeBtn('step3Next');
    return false;
  }
  if (step === 4 && !state.recommendation) {
    showToast('Please share your recommendation', 'error');
    shakeBtn('step4Next');
    return false;
  }
  return true;
}

function shakeBtn(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.classList.remove('shake');
  void btn.offsetWidth; // reflow
  btn.classList.add('shake');
  btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true });
}

function updateStepUI() {
  const n = state.currentStep;
  document.getElementById('stepLabel').textContent = `Step ${n} of ${state.totalSteps}`;

  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    const dotStep = i + 1;
    dot.classList.remove('active', 'completed');
    if (dotStep === n) {
      dot.classList.add('active');
      dot.innerHTML = `<span>${dotStep}</span>`;
    } else if (dotStep < n) {
      dot.classList.add('completed');
      dot.innerHTML = `<span>✓</span>`;
    } else {
      dot.innerHTML = `<span>${dotStep}</span>`;
    }
  });

  document.querySelectorAll('.step-line').forEach((line, i) => {
    line.classList.toggle('filled', i < n - 1);
  });
}

// ─── Selections ───────────────────────────────────────────────────────────────
function selectService(el, service) {
  document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedService = service;
  document.getElementById('step1Next').disabled = false;
}

function selectEmoji(el) {
  document.querySelectorAll('.emoji-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.emojiValue = parseInt(el.dataset.value);
  state.emojiWord = el.dataset.word;
  setStar(state.emojiValue);
  document.getElementById('step2Next').disabled = false;
}

function setStar(val) {
  state.starRating = val;
  state.emojiValue = val;
  const wordMap = { 1: 'poor', 2: 'average', 3: 'decent', 4: 'great', 5: 'excellent' };
  state.emojiWord = wordMap[val];

  document.querySelectorAll('.star').forEach((s, i) => {
    s.classList.toggle('active', i < val);
  });

  // Sync emoji card
  document.querySelectorAll('.emoji-card').forEach(card => {
    card.classList.toggle('selected', parseInt(card.dataset.value) === val);
  });

  document.getElementById('step2Next').disabled = false;
}

function toggleHighlight(el, highlight) {
  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    if (!state.selectedHighlights.includes(highlight)) {
      state.selectedHighlights.push(highlight);
    }
  } else {
    state.selectedHighlights = state.selectedHighlights.filter(h => h !== highlight);
  }
  document.getElementById('step3Next').disabled = state.selectedHighlights.length === 0;
}

function selectRec(el) {
  document.querySelectorAll('.rec-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.recommendation = el.dataset.value;
  document.getElementById('step4Next').disabled = false;
}

// ─── Character Counter ────────────────────────────────────────────────────────
function updateCharCount() {
  const msg = document.getElementById('personalMsg').value;
  state.personalMessage = msg;
  document.getElementById('charCount').textContent = msg.length;
}

// ─── Smart Review Generation ──────────────────────────────────────────────────
function buildReview() {
  const c = state.client;
  const rating = state.starRating || state.emojiValue || 5;
  const vars = { name: c.name, service: state.selectedService, location: c.location };

  // Opener
  const opener = fill(pick(OPENERS[rating]), vars);

  // Service phrase
  const servicePhrase = fill(SERVICE_PHRASES[rating], vars);

  // Highlights
  const highlights = state.selectedHighlights.map(h => h.toLowerCase());
  let highlightSentence = '';
  if (highlights.length > 0) {
    const intro = HIGHLIGHT_INTROS[rating];
    if (highlights.length === 1) {
      highlightSentence = `${intro} the ${highlights[0]}.`;
    } else if (highlights.length === 2) {
      highlightSentence = `${intro} the ${highlights[0]} and ${highlights[1]}.`;
    } else {
      const last = highlights[highlights.length - 1];
      const rest = highlights.slice(0, -1);
      highlightSentence = `${intro} the ${rest.join(', ')}, and ${last}.`;
    }
  }

  // Personal message
  let personalPart = '';
  if (state.personalMessage.trim()) {
    personalPart = state.personalMessage.trim();
    if (!/[.!?]$/.test(personalPart)) personalPart += '.';
  }

  // Closer
  const closer = fill(pick(REC_CLOSERS[state.recommendation] || REC_CLOSERS['recommended']), vars);

  // Assemble: vary structure by rating
  let parts;
  if (rating >= 4) {
    parts = [opener, `I ${servicePhrase}.`, highlightSentence, personalPart, closer];
  } else if (rating === 3) {
    parts = [opener, `I ${servicePhrase}.`, highlightSentence, personalPart, closer];
  } else {
    parts = [opener, `I ${servicePhrase}.`, personalPart, highlightSentence, closer];
  }

  const review = parts.filter(Boolean).join(' ').replace(/\s{2,}/g, ' ').trim();
  state.generatedReview = review;

  const textarea = document.getElementById('reviewOutput');
  textarea.value = review;
  textarea.oninput = () => {
    state.generatedReview = textarea.value;
    document.getElementById('reviewCharCount').textContent = textarea.value.length;
  };
  document.getElementById('reviewCharCount').textContent = review.length;

  // Stars display
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  document.getElementById('reviewStarsDisplay').textContent = filled + empty;
}

// ─── Copy + Redirect ──────────────────────────────────────────────────────────
async function copyAndRedirect() {
  const review = document.getElementById('reviewOutput').value.trim();
  if (!review) {
    showToast('Review is empty!', 'error');
    return;
  }

  const btn = document.getElementById('copyPostBtn');
  btn.classList.add('loading');
  btn.innerHTML = '<span class="cta-icon">⏳</span> Copying…';

  try {
    await navigator.clipboard.writeText(review);
    showToast('✓ Copied! Opening Google Reviews…', 'success');
    btn.innerHTML = '<span class="cta-icon">✅</span> Copied! Redirecting…';
    setTimeout(() => {
      window.open(state.client.reviewLink, '_blank');
      btn.classList.remove('loading');
      btn.innerHTML = '<span class="cta-icon">📋</span> Copy & Post Review';
    }, 1200);
  } catch (err) {
    const textarea = document.getElementById('reviewOutput');
    textarea.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.getElementById('manualCopy').style.display = 'block';
    showToast('Please copy the text above manually', 'info');
    btn.classList.remove('loading');
    btn.innerHTML = '<span class="cta-icon">📋</span> Copy & Post Review';
    setTimeout(() => window.open(state.client.reviewLink, '_blank'), 1800);
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimer = null;

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Injected Styles ──────────────────────────────────────────────────────────
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .shake { animation: shake 0.4s ease !important; }
`;
document.head.appendChild(extraStyle);