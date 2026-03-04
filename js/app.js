// ========== SIDEBAR TOGGLE ==========
function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

// ========== ACTIVE NAV ==========
function setActiveNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === path || (path === '' && item.dataset.page === 'dashboard.html')) {
      item.classList.add('active');
    }
  });
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `
    <i class="bi bi-${type === 'success' ? 'check-circle-fill success' : 'x-circle-fill error'}"></i>
    <span>${message}</span>
    <i class="bi bi-x ms-auto" style="cursor:pointer;color:var(--text-muted)" onclick="this.parentElement.remove()"></i>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toastContainer';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

// ========== SETTINGS NAVIGATION ==========
function initSettingsNav() {
  const items = document.querySelectorAll('.settings-nav-item');
  const panels = document.querySelectorAll('.settings-panel');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const target = document.getElementById(item.dataset.panel);
      if (target) { target.classList.add('active'); }
    });
  });
}

// ========== CONTENT TYPE SELECTION ==========
function initContentTypeBtns() {
  document.querySelectorAll('.content-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.content-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ========== SIMULATE AI GENERATION ==========
const sampleOutputs = {
  blog: `# How Artificial Intelligence is Revolutionizing Content Marketing in 2025

The landscape of content marketing has undergone a seismic shift. What once took teams of writers weeks to produce can now be generated, refined, and optimized within minutes. But this isn't a story about AI replacing humans — it's about humans and AI creating something far greater together.

## The New Content Creation Paradigm

Modern marketers are discovering that AI tools don't just accelerate their workflow; they fundamentally transform the quality ceiling of what's possible. By handling the structural and factual groundwork, AI allows creative professionals to focus on what they do best: strategic thinking, emotional resonance, and authentic storytelling.

## What This Means for Your Brand

Brands that embrace AI-augmented content creation are seeing 3x faster publication cycles, 40% higher engagement rates, and significantly reduced per-piece production costs. The competitive advantage is real, measurable, and growing.`,

  social: `🚀 Big news for content creators!

We just crossed 10,000 users on ContentForge AI — and we're just getting started.

Here's what our community has created this month:
✅ 2.4M words generated
✅ 18K posts published
✅ 340K hours saved

The future of content creation is here. And it's more human than ever.

👉 Join us and create your first post free — link in bio.

#ContentMarketing #AITools #ContentCreation #Marketing #SaaS`,

  email: `Subject: Your Q4 Content Strategy is Ready 🎯

Hi [First Name],

I hope this finds you well. I wanted to reach out personally because based on your recent activity on ContentForge, I noticed you're scaling up your content production significantly — and I have some ideas that could help.

We've just launched three new features specifically designed for teams like yours:

**1. Brand Voice Profiles** — Ensure every piece of content sounds unmistakably you.
**2. LinkedIn Direct Publishing** — Schedule and post directly from our platform.
**3. Team Collaboration** — Review, comment, and approve content without leaving the app.

I'd love to walk you through these in a quick 15-minute call. Would Thursday or Friday work for you?

Best,
Sarah from ContentForge`
};

function simulateGeneration(type = 'blog') {
  const outputEl = document.getElementById('generatedOutput');
  const placeholderEl = document.getElementById('outputPlaceholder');
  const loaderEl = document.getElementById('outputLoader');

  if (!outputEl) return;

  if (placeholderEl) placeholderEl.style.display = 'none';
  if (loaderEl) loaderEl.style.display = 'flex';
  outputEl.style.display = 'none';

  const content = sampleOutputs[type] || sampleOutputs.blog;
  let i = 0;

  setTimeout(() => {
    if (loaderEl) loaderEl.style.display = 'none';
    outputEl.style.display = 'block';
    outputEl.textContent = '';
    outputEl.classList.add('typing-cursor');

    const interval = setInterval(() => {
      outputEl.textContent += content[i];
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        outputEl.classList.remove('typing-cursor');
      }
    }, 12);
  }, 1800);
}

// ========== CREDIT METER ==========
function animateCreditMeter() {
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach(bar => {
    const target = bar.dataset.width || '65';
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target + '%'; }, 300);
  });
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target || el.textContent.replace(/,/g, ''));
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 20);
  });
}

// ========== BRAND VOICE SELECTION ==========
function initVoiceCards() {
  document.querySelectorAll('.voice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// ========== COPY TO CLIPBOARD ==========
function copyToClipboard(text) {
  if (!text) {
    const out = document.getElementById('generatedOutput');
    text = out ? out.textContent : '';
  }
  if (!text.trim()) { showToast('Nothing to copy yet!', 'error'); return; }
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!')).catch(() => showToast('Copy failed', 'error'));
}

// ========== LINKEDIN CHAR COUNTER ==========
function initLinkedInCounter() {
  const ta = document.getElementById('linkedInText');
  const counter = document.getElementById('liCharCount');
  if (ta && counter) {
    ta.addEventListener('input', () => {
      const len = ta.value.length;
      counter.textContent = `${len} / 3000`;
      counter.style.color = len > 2800 ? 'var(--danger)' : 'var(--text-muted)';
    });
  }
}

// ========== MOBILE HAMBURGER ==========
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  if (btn) btn.addEventListener('click', toggleSidebar);

  document.addEventListener('click', e => {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.getElementById('hamburgerBtn');
    if (sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !btn?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ========== PLAN SELECT ==========
function selectPlan(planName) {
  showToast(`Upgrading to ${planName} plan...`);
  setTimeout(() => showToast('Redirecting to checkout...'), 1500);
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initSettingsNav();
  initContentTypeBtns();
  animateCreditMeter();
  animateCounters();
  initVoiceCards();
  initHamburger();
  initLinkedInCounter();
});
