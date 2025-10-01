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

  function setFooterYear() {
    const y = document.getElementById('y');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    wireWhatsAppButtons();
  });
})();
