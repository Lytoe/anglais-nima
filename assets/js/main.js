// main.js — small helpers only (no heavy frameworks)

(function () {
  const DEFAULT_WA_NUMBER = '+33745301632';
  const DEFAULT_WA_TEXT = "Bonjour, je vous contacte afin d'obtenir des informations sur les cours d'anglais que vous proposez...";

  function buildWaHref(number, text) {
    const n = (number || DEFAULT_WA_NUMBER).replace(/\s+/g, '');
    const msg = encodeURIComponent(text || DEFAULT_WA_TEXT);
    return `https://wa.me/${n.replace(/^\+/, '')}?text=${msg}`;
  }

  function wireWhatsAppButtons() {
    const els = document.querySelectorAll('[data-wa-number][data-wa-text]');
    els.forEach(a => {
      const num = a.getAttribute('data-wa-number') || DEFAULT_WA_NUMBER;
      const txt = a.getAttribute('data-wa-text') || DEFAULT_WA_TEXT;
      a.href = buildWaHref(num, txt);
      a.target = '_blank';
      a.rel = 'noopener';


    });
  }
  function initLightbox() {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox__close" aria-label="Fermer">×</button>
      <img class="lightbox__img" alt="">
    `;
    document.body.appendChild(lb);

    const img = lb.querySelector('.lightbox__img');
    const close = () => lb.classList.remove('open');
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox__close')) close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    document.querySelectorAll('[data-lightbox="img"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const src = a.getAttribute('data-lb-src');
        if (!src) { window.open(a.href, '_blank'); return; }
        img.src = src;
        lb.classList.add('open');
      });
    });
  }



  function setFooterYear() {
    const y = document.getElementById('y');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    wireWhatsAppButtons();
    initLightbox();
  });
})();
