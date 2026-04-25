/* ============================================================
   ÍCONOS DE LOS VIDEOJUEGOS — Global JS
   Cursor · Language · Scroll reveal · Back to top · Particles
   ============================================================ */

(function () {

  /* ── CUSTOM CURSOR ── */
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cur && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });
    // ring follows with lag
    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .char-card, label, input').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ── PS4 PARTICLES ── */
  const psBg = document.getElementById('ps-bg');
  if (psBg) {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'ps-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${8 + Math.random() * 14}s;
        animation-delay: ${Math.random() * 12}s;
        opacity: 0;
        width: ${Math.random() > 0.7 ? 3 : 2}px;
        height: ${Math.random() > 0.7 ? 3 : 2}px;
        background: hsl(${195 + Math.random()*30}, 100%, ${55 + Math.random()*25}%);
      `;
      psBg.appendChild(p);
    }
  }

  /* ── LANGUAGE TOGGLE ── */
  let lang = localStorage.getItem('gamer-lang') || 'es';

  function applyLang() {
    document.documentElement.lang = lang;
    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-es]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    const btn = document.getElementById('lang-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        lang = lang === 'es' ? 'en' : 'es';
        localStorage.setItem('gamer-lang', lang);
        applyLang();
      });
    }

    /* ── SCROLL REVEAL ── */
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ── BACK TO TOP ── */
    const bt = document.getElementById('back-top');
    if (bt) {
      window.addEventListener('scroll', () => {
        bt.classList.toggle('visible', window.scrollY > 500);
      }, { passive: true });
      bt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── LAZY IMAGES ── */
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.complete) { img.classList.add('loaded'); return; }
      img.addEventListener('load', () => img.classList.add('loaded'));
    });

    /* ── ACTIVE NAV LINK ── */
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && (href === page || (page === '' && href === 'index.html') || href.startsWith(page.replace('.html','')))) {
        a.classList.add('active');
      }
    });
  });

})();
