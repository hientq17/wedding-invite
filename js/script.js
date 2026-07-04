document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMiniCalendar();
  initRevealOnScroll();
  initCopyButtons();
  initRsvpForm();
});

function initMusicToggleWiring() {
  const music = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  musicToggle.addEventListener('click', () => {
    if (music.paused) {
      music.play().catch(() => {});
      musicToggle.setAttribute('aria-pressed', 'true');
    } else {
      music.pause();
      musicToggle.setAttribute('aria-pressed', 'false');
    }
  });
}
initMusicToggleWiring();

/* ============================================
   Countdown timer
   ============================================ */
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date(el.dataset.weddingDate).getTime();

  const daysEl = el.querySelector('[data-days]');
  const hoursEl = el.querySelector('[data-hours]');
  const minutesEl = el.querySelector('[data-minutes]');
  const secondsEl = el.querySelector('[data-seconds]');

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      [daysEl, hoursEl, minutesEl, secondsEl].forEach(n => n.textContent = '00');
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ============================================
   Mini calendar with wedding date highlighted
   ============================================ */
function initMiniCalendar() {
  const el = document.getElementById('mini-calendar');
  if (!el) return;

  const highlight = new Date(el.dataset.highlightDate);
  const year = highlight.getFullYear();
  const month = highlight.getMonth();

  const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const dow = ['CN','T2','T3','T4','T5','T6','T7'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `<div class="mini-calendar__header">${monthNames[month]} ${year}</div>`;
  html += '<div class="mini-calendar__grid">';
  dow.forEach(d => html += `<span class="dow">${d}</span>`);
  for (let i = 0; i < firstDay; i++) html += '<span></span>';
  for (let day = 1; day <= daysInMonth; day++) {
    const isHighlight = day === highlight.getDate();
    html += `<span class="mini-calendar__day${isHighlight ? ' is-highlight' : ''}">${day}</span>`;
  }
  html += '</div>';

  el.innerHTML = html;
}

/* ============================================
   Reveal-on-scroll animation
   ============================================ */
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

/* ============================================
   Copy-to-clipboard for gift account numbers
   ============================================ */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const original = btn.textContent;
        btn.textContent = 'Đã sao chép!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      } catch (err) {
        // Clipboard API unavailable (e.g. insecure context) — fail silently.
      }
    });
  });
}

/* ============================================
   RSVP form
   ============================================
   This currently just confirms on-page. To actually collect responses,
   point the fetch() call below at a form backend (Formspree, Google
   Apps Script, your own API, etc.) and pass along the FormData.
*/
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;
  const thanks = document.getElementById('rsvp-thanks');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Example of wiring to a real backend:
    // const data = new FormData(form);
    // fetch('https://formspree.io/f/your-id', { method: 'POST', body: data, headers: { Accept: 'application/json' } });

    form.reset();
    thanks.hidden = false;
  });
}
