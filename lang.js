// Shared language toggle for all pages
(function(){
  let lang = localStorage.getItem('lang') || 'es';

  function applyLang(){
    document.documentElement.lang = lang;
    const btn = document.getElementById('lang-btn');
    if(btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-es]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if(txt) el.innerHTML = txt;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    const btn = document.getElementById('lang-btn');
    if(btn){
      btn.addEventListener('click', () => {
        lang = lang === 'es' ? 'en' : 'es';
        localStorage.setItem('lang', lang);
        applyLang();
      });
    }
  });
})();
