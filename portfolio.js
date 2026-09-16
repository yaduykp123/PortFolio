const PROJECTS = {
  expireoff: {
    title: 'ExpireOff',
    type: 'Full-stack food-prevention platform',
    lede: 'A food-prevention e-commerce platform designed around reducing waste from products approaching expiry.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Cron Jobs'],
    live: 'https://food-expireoff-d26823.netlify.app/',
    github: 'https://github.com/yaduykp123',
    sections: [
      ['Problem', 'Food products can lose value quickly as expiry approaches. The application is designed around surfacing and handling expiry-related product workflows rather than treating every item as an ordinary listing.'],
      ['Solution', 'A full-stack web application with a React interface, Express APIs and MongoDB persistence, plus scheduled expiry processing for time-based workflows.'],
      ['Technical focus', 'Frontend state and UI, REST API integration, MongoDB data modeling, authentication, and scheduled backend logic for expiry-related processing.'],
      ['Architecture', 'React → REST API → Express controllers → Mongoose → MongoDB', ['React', 'REST API', 'Express', 'Mongoose', 'MongoDB']]
    ]
  },
  shoply: {
    title: 'Shoply',
    type: 'Full-stack e-commerce application',
    lede: 'A mobile shopping application with product discovery, cart, wishlist, orders, admin tools, image upload and Razorpay integration.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay'],
    live: 'https://e-commerce-app-shoply-git-master-yaduykp123s-projects.vercel.app/',
    github: 'https://github.com/yaduykp123',
    sections: [
      ['Problem', 'A shopping experience needs more than a product grid: it must manage user state, product data, cart behavior, orders, admin workflows and checkout.'],
      ['Solution', 'A React frontend communicates with an Express backend over REST APIs. Redux Toolkit handles client-side application state while MongoDB stores users, products and related application data.'],
      ['Technical focus', 'Authentication, cart and wishlist flows, infinite scrolling and shimmer loading, admin pagination, image upload, order handling and Razorpay payment integration.'],
      ['Architecture', 'React + Redux Toolkit → REST API → Express → Mongoose → MongoDB', ['React', 'Redux Toolkit', 'Express', 'Mongoose', 'MongoDB']]
    ]
  }
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// ----- Base UI -----
$('#year').textContent = new Date().getFullYear();

// ----- 30-second accent colour cycle -----
const accentThemes = [
  { accent: '#67e8f9', accent2: '#a78bfa', accent3: '#86efac' },
  { accent: '#c4b5fd', accent2: '#f0abfc', accent3: '#93c5fd' },
  { accent: '#f9a8d4', accent2: '#fdba74', accent3: '#fde68a' }
];
let accentIndex = 0;
function applyAccentTheme(index) {
  const theme = accentThemes[index % accentThemes.length];
  const root = document.documentElement;
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-2', theme.accent2);
  root.style.setProperty('--accent-3', theme.accent3);
  root.style.setProperty('--accent-soft', `${theme.accent}22`);
  document.querySelectorAll('.hero-title, .section-head, .skills-cloud, .project-card, .contact-panel, .site-footer').forEach(el => {
    el.classList.remove('theme-pulse');
    void el.offsetWidth;
    el.classList.add('theme-pulse');
  });
}
window.setInterval(() => { accentIndex = (accentIndex + 1) % accentThemes.length; applyAccentTheme(accentIndex); }, 30000);

const mobileBtn = $('#mobileMenuBtn');
const mobileMenu = $('#mobileMenu');
mobileBtn?.addEventListener('click', () => {
  const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
  mobileBtn.setAttribute('aria-expanded', String(!isOpen));
  mobileBtn.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mobileBtn.innerHTML = isOpen ? '<i class="fa-solid fa-bars"></i>' : '<i class="fa-solid fa-xmark"></i>';
  mobileMenu.hidden = isOpen;
});
$$('#mobileMenu a').forEach((link) => link.addEventListener('click', () => {
  mobileBtn.setAttribute('aria-expanded', 'false');
  mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  mobileMenu.hidden = true;
}));

const progress = $('#scrollProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.14 });
$$('.reveal').forEach((el) => observer.observe(el));

// ----- Animated car/person navigation -----
const navRail = $('#navRail');
const car = $('.nav-car');
const navLinks = $$('.nav-link');
const targetSections = $$('section[id]');

function moveCarTo(link) {
  if (!navRail || !car || !link) return;
  const railRect = navRail.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const left = linkRect.left - railRect.left + (linkRect.width / 2) - 29;
  car.style.left = `${Math.max(4, Math.min(left, railRect.width - 62))}px`;
  car.classList.remove('returning');
  car.classList.add('walking');
  window.setTimeout(() => {
    car.classList.remove('walking');
    car.classList.add('returning');
  }, 560);
}

navLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  moveCarTo(link);
  document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === visible.target.id));
  const active = navLinks.find(link => link.classList.contains('active'));
  if (active && window.innerWidth > 980) {
    const railRect = navRail.getBoundingClientRect();
    const linkRect = active.getBoundingClientRect();
    car.style.left = `${Math.max(4, Math.min(linkRect.left - railRect.left + linkRect.width/2 - 29, railRect.width - 62))}px`;
  }
}, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5, .8, 1] });
targetSections.forEach(section => sectionObserver.observe(section));

// ----- Project case-study modal -----
const modal = $('#projectModal');
const modalContent = $('#modalContent');
let lastFocused = null;
function openProject(id) {
  const project = PROJECTS[id];
  if (!project) return;
  lastFocused = document.activeElement;
  modalContent.innerHTML = `
    <div class="modal-body">
      <span class="modal-tag">${project.type}</span>
      <h3 id="modalTitle">${project.title}</h3>
      <p class="modal-lede">${project.lede}</p>
      <div class="tech-row">${project.stack.map(x => `<span>${x}</span>`).join('')}</div>
      <div class="modal-cols">
        ${project.sections.map(([title, body, arch]) => `
          <section class="modal-block">
            <h4>${title}</h4>
            ${arch ? `<div class="modal-arch">${arch.map(x => `<span>${x}</span>`).join('')}</div><p>${body}</p>` : `<p>${body}</p>`}
          </section>`).join('')}
      </div>
      <div class="project-footer" style="margin-top:24px">
        <a href="${project.live}" target="_blank" rel="noreferrer">Open live project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="${project.github}" target="_blank" rel="noreferrer">GitHub <i class="fa-brands fa-github"></i></a>
      </div>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('.modal-close', modal)?.focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  lastFocused?.focus?.();
}
$$('[data-open-project]').forEach(btn => btn.addEventListener('click', () => openProject(btn.dataset.openProject)));
$$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// ----- AI portfolio assistant -----
const aiOpen = $('#aiOpenBtn');
const aiPanel = $('#aiPanel');
const aiClose = $('#aiCloseBtn');
const aiMessages = $('#aiMessages');
const aiSuggestions = $('#aiSuggestions');
const aiForm = $('#aiForm');
const aiInput = $('#aiInput');
const aiStatus = $('#aiStatus');
const conversation = [];

const suggestions = [
  'What projects has Yadu built?',
  'Tell me about Shoply',
  'What is ExpireOff?',
  'What technologies does Yadu use?',
  'How can I contact Yadu?'
];

function addMessage(role, text, isHtml = false) {
  const node = document.createElement('div');
  node.className = `ai-msg ${role}`;
  if (isHtml) node.innerHTML = text;
  else node.textContent = text;
  aiMessages.appendChild(node);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return node;
}

function setSuggestions(hidden = false) {
  aiSuggestions.innerHTML = '';
  if (hidden) return;
  suggestions.forEach((q) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ai-suggestion';
    button.textContent = q;
    button.addEventListener('click', () => sendAiMessage(q));
    aiSuggestions.appendChild(button);
  });
}

function openAi() {
  aiPanel.hidden = false;
  aiOpen.setAttribute('aria-expanded', 'true');
  if (!aiMessages.children.length) {
    addMessage('bot', 'Hi — I’m Yadu’s AI portfolio assistant. Ask me about his projects, stack, experience or how the applications are built.');
    setSuggestions();
  }
  aiInput.focus();
}
function closeAi() {
  aiPanel.hidden = true;
  aiOpen.setAttribute('aria-expanded', 'false');
  aiOpen.focus();
}
aiOpen.addEventListener('click', openAi);
aiClose.addEventListener('click', closeAi);

function addTyping() {
  const node = document.createElement('div');
  node.className = 'ai-msg bot';
  node.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
  aiMessages.appendChild(node);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return node;
}

function portfolioFallback(question) {
  const q = question.toLowerCase();
  if (/who is|about yadu|introduce yadu|yadu krishnan/.test(q)) {
    return 'Yadu Krishnan is a Full Stack Developer focused on building responsive web applications with React, Node.js, Express.js, MongoDB and PostgreSQL. He has also worked with authentication, REST APIs, Redux Toolkit, Prisma and third-party integrations.';
  }
  if (/project|projects/.test(q) && !/shoply|expireoff/.test(q)) {
    return 'Yadu’s featured projects are ExpireOff, a food-prevention e-commerce platform, and Shoply, a full-stack shopping application. Both are linked in the Projects section.';
  }
  if (/shoply|e-commerce|ecommerce|payment|razorpay|cart|wishlist/.test(q)) {
    return 'Shoply is a full-stack e-commerce application using React, Vite, Tailwind CSS and Redux Toolkit on the frontend, with Node.js, Express.js and MongoDB on the backend. It includes cart, wishlist, orders, admin tooling, image upload and Razorpay payment integration.';
  }
  if (/expireoff|expiry|food waste|food prevention/.test(q)) {
    return 'ExpireOff is a food-prevention e-commerce platform built with React, Node.js, Express.js and MongoDB. Its backend also uses scheduled processing for expiry-related workflows.';
  }
  if (/skill|technology|stack|tech/.test(q)) {
    return 'Yadu works across frontend, backend and database layers. Frequently used technologies include React, JavaScript, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, Node.js, Express.js, MongoDB, PostgreSQL, Prisma, JWT, Git and GitHub.';
  }
  if (/contact|email|github/.test(q)) {
    return 'You can contact Yadu at yadukrishnanP917@gmail.com or visit github.com/yaduykp123.';
  }
  return 'I’m configured to answer questions about Yadu’s portfolio, projects, skills, experience and contact details. Try asking “Tell me about Shoply” or “What technologies does Yadu use?”';
}

function safeText(text) {
  return String(text).replace(/[<>]/g, '').slice(0, 4000);
}

async function requestAi(question) {
  conversation.push({ role: 'user', content: question });
  const recent = conversation.slice(-8);
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question, history: recent })
    });
    if (!response.ok) throw new Error(`AI endpoint ${response.status}`);
    const data = await response.json();
    if (!data?.reply) throw new Error('Empty AI response');
    conversation.push({ role: 'assistant', content: data.reply });
    return data.reply;
  } catch (error) {
    aiStatus.textContent = 'Using portfolio fallback — the AI endpoint is not configured yet.';
    const fallback = portfolioFallback(question);
    conversation.push({ role: 'assistant', content: fallback });
    return fallback;
  }
}

async function sendAiMessage(question) {
  const text = safeText(question.trim());
  if (!text || aiStatus.dataset.busy === 'true') return;
  aiStatus.dataset.busy = 'true';
  aiStatus.textContent = 'Thinking…';
  setSuggestions(true);
  addMessage('user', text);
  aiInput.value = '';
  const typing = addTyping();
  const reply = await requestAi(text);
  typing.remove();
  addMessage('bot', reply);
  aiStatus.dataset.busy = 'false';
  if (!aiStatus.textContent.includes('fallback')) aiStatus.textContent = '';
}

aiForm.addEventListener('submit', (event) => { event.preventDefault(); sendAiMessage(aiInput.value); });
aiInput.addEventListener('input', () => { aiInput.style.height = 'auto'; aiInput.style.height = `${Math.min(aiInput.scrollHeight, 110)}px`; });
aiInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); aiForm.requestSubmit(); }
});

// ----- Walking person around the profile image -----
const portraitFrame = $('#portraitFrame');
const portraitWalker = $('#portraitWalker');
let walkerStart = performance.now();
const WALK_MS = 20000;

function animatePortraitWalker(now) {
  if (!portraitFrame || !portraitWalker) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    portraitWalker.style.transform = 'translate(-50%, -50%)';
    portraitWalker.className = 'portrait-walker';
    return;
  }

  // One complete lap takes 20 seconds, then immediately starts the next lap.
  // There is intentionally no standing/pause state.
  const elapsed = (now - walkerStart) % WALK_MS;
  portraitWalker.classList.remove('is-standing');
  portraitWalker.classList.add('is-walking','is-running');

  const progress = elapsed / WALK_MS;
  const angle = (-90 + progress * 360) * Math.PI / 180;
  const width = portraitFrame.clientWidth + 40;
  const height = Math.min(portraitFrame.clientHeight + 28, 610);
  const radiusX = width / 2;
  const radiusY = height / 2;
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;
  const rotation = (angle * 180 / Math.PI) + 90;
  portraitWalker.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`;

  requestAnimationFrame(animatePortraitWalker);
}
requestAnimationFrame(animatePortraitWalker);

window.addEventListener('resize', () => {
  const active = navLinks.find(link => link.classList.contains('active'));
  if (active && window.innerWidth > 980) {
    const railRect = navRail.getBoundingClientRect();
    const linkRect = active.getBoundingClientRect();
    car.style.left = `${Math.max(4, Math.min(linkRect.left - railRect.left + linkRect.width/2 - 29, railRect.width - 62))}px`;
  }
});
