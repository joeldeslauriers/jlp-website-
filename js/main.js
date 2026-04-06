/* ============================================================
   JOE LAURIER PRODUCTION — main.js
   Vanilla JS — aucun framework requis
   ============================================================ */

// Base path: '' pour /index.html, '../' pour /en/index.html
// Défini dans chaque HTML avant le chargement de ce script
const BASE = (typeof BASE_PATH !== 'undefined') ? BASE_PATH : '';

// ============================================================
// CONFIG — BEATS
// Pour ajouter un beat:
//   1. Copiez un objet existant
//   2. Changez les valeurs (name, bpm, scale, genre, price)
//   3. Mettez le fichier audio dans beats/NomDuBeat/
//   4. Mettez la cover image dans beats/NomDuBeat/
//   5. Ajustez les chemins file et cover
// ============================================================
const beats = [
  {
    id: 2,
    name: "Hitman",
    bpm: 145,
    scale: "Bb Major",
    genre: "Trap",
    price: 10.00,
    file: "beats/Hitman/Joe Laurier - Hitman - 145 BPM - Bb Major - 14 LUFS.mp3",
    cover: "beats/Hitman/73e37e66-f1ff-462e-b4ca-46185763159c.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 1,
    name: "Back to Back",
    bpm: 140,
    scale: "G Minor",
    genre: "Trap",
    price: 10.00,
    file: "beats/Back to Back/Joe Lauriers - Back to Back - 140BPM - Gm - 14 L.mp3",
    cover: "beats/Back to Back/Youtube Image.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 4,
    name: "Like I Do",
    bpm: 140,
    scale: "C# Minor",
    genre: "Trap",
    price: 10.00,
    file: "beats/Like I Do/Joe Lauriers - Love you - 140BPM - C M - 14 L.mp3",
    cover: "beats/Like I Do/72890339-1c69-48a6-8959-e947bbd61b2c.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 9,
    name: "First Class",
    bpm: 150,
    scale: "G Minor",
    genre: "Trap",
    price: 10.00,
    file: "beats/First Class/Joe Laurier - First Class - 150 BPM - G  Minor.mp3",
    cover: "beats/First Class/15db2d6c-f70e-4739-922c-2d30bc5dafd1.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 3,
    name: "Keep On Running",
    bpm: 130,
    scale: "E Minor",
    genre: "Hip-Hop",
    price: 10.00,
    file: "beats/Keep On Running/Joe Laurier - Keep On Running - 130 BPM - Em - 14 LUFS - Officiel-002.mp3",
    cover: "beats/Keep On Running/377d1f5b-46f4-4fa8-8cb4-aebbc55ec72f.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 5,
    name: "Like That",
    bpm: 130,
    scale: "D Minor",
    genre: "Hip-Hop",
    price: 10.00,
    file: "beats/Like That/Joe Laurier - Like That -130 BPM -  Dm - 14 LUFS-002.mp3",
    cover: "beats/Like That/d6f73f6e-a849-402e-83ec-9038c54c5733.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 6,
    name: "On My Wave",
    bpm: 140,
    scale: "A Minor",
    genre: "Trap",
    price: 10.00,
    file: "beats/On My Wave/Joe Lauriers - On Sight - 140BPM - Am - 14 L.mp3",
    cover: "beats/On My Wave/74bdb6b5-47ce-47d2-ae49-f04daafbab8d.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 7,
    name: "Still Blazing",
    bpm: 90,
    scale: "B Minor",
    genre: "Hip-Hop",
    price: 10.00,
    // Note: le dossier est "Sitll Blazing" (faute de frappe dans le nom du dossier)
    file: "beats/Sitll Blazing/Joe Laurier - Still Blazing - 90BPM - Bm - 14 L.mp3",
    cover: "beats/Sitll Blazing/6ca99ea3-b402-4dcb-b341-6157a83e7d79.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  },
  {
    id: 8,
    name: "Weekend",
    bpm: 90,
    scale: "F# Major",
    genre: "Hip-Hop",
    price: 10.00,
    file: "beats/Weekend/Joe Laurier -Weekend - 90 BPM - F  Major - 14 LUFS.mp3",
    cover: "beats/Weekend/9caba69c-29f8-4dc6-9ed9-725b8d225eb2.png",
    beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
  }
];


// ============================================================
// PLAYER AUDIO
// ============================================================
let currentAudio    = null;
let currentBeatId   = null;
let progressTimer   = null;

// Génère des barres de waveform aléatoires
function generateWaveform(barCount = 28) {
  return Array.from({ length: barCount }, () => {
    const h   = (Math.random() * 72 + 14).toFixed(1);
    const dur = (Math.random() * 0.35 + 0.28).toFixed(2);
    const del = (Math.random() * 0.35).toFixed(2);
    return `<div class="waveform-bar" style="height:${h}%;--dur:${dur}s;animation-delay:${del}s"></div>`;
  }).join('');
}

// Formate le prix
function fmtPrice(price) {
  return price === 0 ? 'GRATUIT' : `$${price.toFixed(2)}`;
}

// ---- Rendu des cards de beats ----
function renderBeats(filter = 'all') {
  const grid = document.getElementById('beatsGrid');
  if (!grid) return;

  const list = filter === 'all'
    ? beats
    : beats.filter(b => b.genre.toLowerCase() === filter.toLowerCase());

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem 0">Aucun beat dans cette catégorie pour l'instant.</p>`;
    return;
  }

  // Label "Acheter" bilingue selon la page courante
  const buyLabel   = (typeof LANG !== 'undefined' && LANG === 'en') ? 'Buy →' : 'Acheter →';
  const licLabel   = (typeof LANG !== 'undefined' && LANG === 'en') ? 'License' : 'Licence';

  grid.innerHTML = list.map(beat => `
    <div class="beat-card" id="beat-${beat.id}" data-genre="${beat.genre}">

      <div class="beat-cover" onclick="togglePlay(${beat.id})">
        <img
          src="${BASE}${beat.cover}"
          alt="${beat.name}"
          loading="lazy"
          onerror="this.style.opacity='0'">
        <div class="beat-cover-overlay"></div>
        <div class="waveform">${generateWaveform()}</div>
        <div class="play-overlay">
          <button class="play-btn" aria-label="Play ${beat.name}">
            <svg id="icon-${beat.id}" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="beat-progress">
        <div class="beat-progress-bar" id="progress-${beat.id}"></div>
      </div>

      <div class="beat-info">
        <div class="beat-name">${beat.name}</div>
        <div class="beat-meta">
          <span class="beat-tag genre">${beat.genre}</span>
          <span class="beat-tag">${beat.bpm} BPM</span>
          <span class="beat-tag">${beat.scale}</span>
        </div>
        <div class="beat-footer">
          <div class="beat-price">
            ${fmtPrice(beat.price)}
            <small>${licLabel}</small>
          </div>
          <button class="btn-buy" onclick="window.open('${beat.beatstarsUrl}','_blank')">${buyLabel}</button>
        </div>
      </div>

    </div>
  `).join('');
}

// ---- Play / Pause ----
function togglePlay(beatId) {
  const beat = beats.find(b => b.id === beatId);
  if (!beat) return;

  // Même beat en lecture → pause
  if (currentBeatId === beatId && currentAudio && !currentAudio.paused) {
    stopAll();
    return;
  }

  // Arrêter le beat précédent
  stopAll();

  // Lazy load: créer l'Audio uniquement au moment du play
  currentAudio  = new Audio(BASE + beat.file);
  currentBeatId = beatId;

  currentAudio.play().catch(err => {
    console.warn('Lecture impossible:', err.message);
    stopAll();
  });

  // UI → état "playing"
  const card = document.getElementById(`beat-${beatId}`);
  const icon = document.getElementById(`icon-${beatId}`);
  if (card) card.classList.add('playing');
  if (icon) icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; // icône pause

  // Mise à jour de la barre de progression
  progressTimer = setInterval(() => {
    if (!currentAudio || currentAudio.paused || isNaN(currentAudio.duration)) return;
    const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
    const bar = document.getElementById(`progress-${beatId}`);
    if (bar) bar.style.width = `${pct}%`;
  }, 250);

  // Fin de piste → reset
  currentAudio.addEventListener('ended', stopAll, { once: true });
}

// ---- Arrêt total ----
function stopAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  clearInterval(progressTimer);

  if (currentBeatId !== null) {
    const card = document.getElementById(`beat-${currentBeatId}`);
    const icon = document.getElementById(`icon-${currentBeatId}`);
    const bar  = document.getElementById(`progress-${currentBeatId}`);
    if (card) card.classList.remove('playing');
    if (icon) icon.innerHTML = '<path d="M8 5v14l11-7z"/>'; // icône play
    if (bar)  bar.style.width = '0%';
  }

  currentAudio  = null;
  currentBeatId = null;
}


// ============================================================
// POPULATE — Select des beats dans le formulaire
// ============================================================
function populateBeatSelect() {
  const sel = document.getElementById('formBeat');
  if (!sel) return;

  // Beats JLP
  beats.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.name;
    opt.textContent = `${b.name}  —  ${b.bpm} BPM  —  ${b.scale}`;
    sel.appendChild(opt);
  });

  // Séparateur
  const sep = document.createElement('option');
  sep.disabled = true;
  sep.textContent = '──────────────────';
  sel.appendChild(sep);

  // Option beat externe
  const other = document.createElement('option');
  const isEn = (typeof LANG !== 'undefined' && LANG === 'en');
  other.value = 'Autre beat (pas un beat JLP)';
  other.textContent = isEn
    ? 'Other beat (not a JLP beat)'
    : 'Autre beat (pas un beat JLP)';
  sel.appendChild(other);
}

// ============================================================
// FILTRE PAR GENRE
// ============================================================
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      stopAll(); // arrêter la lecture en cours avant de re-rendre
      renderBeats(btn.dataset.filter);
    });
  });
}

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  // Hamburger ↔ menu mobile
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // Bordure nav au scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active link en fonction de la section visible
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(s => io.observe(s));
  }
}

// ============================================================
// SMOOTH SCROLL (compense la nav fixe de 70px)
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================================================
// FORMULAIRE FORMSPREE
// ============================================================
function initForm() {
  const form = document.getElementById('submissionForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validation: lien Google Drive
    const driveInput = document.getElementById('formDrive');
    if (driveInput && !driveInput.value.trim().startsWith('https://drive.google.com')) {
      driveInput.focus();
      driveInput.style.borderColor = 'var(--red)';
      const msg = (typeof LANG !== 'undefined' && LANG === 'en')
        ? '⚠️ The Google Drive link must start with https://drive.google.com'
        : '⚠️ Le lien Google Drive doit commencer par https://drive.google.com';
      alert(msg);
      return;
    }
    if (driveInput) driveInput.style.borderColor = '';

    // Désactiver le bouton pendant l'envoi
    const submitBtn = form.querySelector('.btn-submit');
    const origText  = submitBtn.textContent;
    const sendingTxt = (typeof LANG !== 'undefined' && LANG === 'en') ? 'Sending…' : 'Envoi en cours…';
    submitBtn.textContent = sendingTxt;
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.classList.add('show');
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Form error:', err);
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      const errMsg = (typeof LANG !== 'undefined' && LANG === 'en')
        ? '❌ Error sending. Please try again or contact us directly.'
        : '❌ Erreur lors de l\'envoi. Réessayez ou contactez-nous directement.';
      alert(errMsg);
    }
  });
}

// ============================================================
// ANIMATION D'ENTRÉE — Fade in au scroll
// ============================================================
function initFadeIn() {
  const els = document.querySelectorAll('.beat-card, .video-card, .step, .req-box');
  if (!els.length) return;

  // Style initial
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => io.observe(el));
}

// ============================================================
// ÉGALISEUR HERO — Barres animées en bas du hero
// ============================================================
function initHeroEq() {
  const eq = document.getElementById('heroEq');
  if (!eq) return;
  const count = 80;
  eq.innerHTML = Array.from({ length: count }, (_, i) => {
    const h   = (Math.random() * 85 + 10).toFixed(1);
    const spd = (Math.random() * 1.4 + 0.9).toFixed(2);
    const del = (Math.random() * 1.5).toFixed(2);
    return `<div class="hero-eq-bar" style="height:${h}%;--spd:${spd}s;--del:${del}s"></div>`;
  }).join('');
}

// ============================================================
// AUTOPLAY — Lance First Class au premier geste de l'utilisateur
// ============================================================
function initAutoplay(beatId) {
  // Tenter directement (fonctionne si l'utilisateur a déjà interagi avec le site)
  setTimeout(() => {
    if (currentBeatId === null) togglePlay(beatId);
  }, 800);

  // Fallback: jouer au premier geste si le navigateur a bloqué l'autoplay
  const startOnInteraction = () => {
    if (currentBeatId === null) togglePlay(beatId);
    ['click', 'scroll', 'touchstart', 'keydown'].forEach(evt =>
      document.removeEventListener(evt, startOnInteraction)
    );
  };

  ['click', 'scroll', 'touchstart', 'keydown'].forEach(evt =>
    document.addEventListener(evt, startOnInteraction, { once: true, passive: true })
  );
}

// ============================================================
// INIT — Point d'entrée
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderBeats();
  initHeroEq();
  populateBeatSelect();
  initFilters();
  initNav();
  initSmoothScroll();
  initForm();

  // Léger délai pour laisser le DOM se peindre avant les animations
  requestAnimationFrame(initFadeIn);

  // Autoplay Still Blazing (id: 7) au chargement ou au premier geste
  initAutoplay(7);
});
