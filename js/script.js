document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMiniCalendar();
  initMiniCalendarBride();
  initRevealOnScroll();
  initCopyButtons();
  initRsvpForm();
  initGiftMessageForm();
  initGalleryLightbox();
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

  function tryAutoplay() {
    music.play()
      .then(() => musicToggle.setAttribute('aria-pressed', 'true'))
      .catch(() => {
        // Autoplay blocked by browser — start on the first user interaction instead.
        const startOnInteraction = () => {
          music.play().catch(() => {});
          musicToggle.setAttribute('aria-pressed', 'true');
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
          document.removeEventListener('keydown', startOnInteraction);
          window.removeEventListener('scroll', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
        window.addEventListener('scroll', startOnInteraction, { passive: true });
      });
  }
  tryAutoplay();
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
  const lunar = el.dataset.lunarDate || '';
  const timeLabel = el.dataset.timeLabel || '';

  const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const dowFull = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  const dow = ['CN','T2','T3','T4','T5','T6','T7'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(highlight.getDate()).padStart(2, '0');

  let grid = '<div class="mini-calendar__grid">';
  dow.forEach(d => grid += `<span class="dow">${d}</span>`);
  for (let i = 0; i < firstDay; i++) grid += '<span></span>';
  for (let day = 1; day <= daysInMonth; day++) {
    const isHighlight = day === highlight.getDate();
    const pin = isHighlight ? '<i class="mini-calendar__pin">&#10084;</i>' : '';
    grid += `<span class="mini-calendar__day${isHighlight ? ' is-highlight' : ''}">${pin}${day}</span>`;
  }
  grid += '</div>';

  el.innerHTML = `
    <div class="mini-calendar__photo">
      <img src="assets/decor/calendar2.jpg" alt="" />
      <span class="mini-calendar__corner mini-calendar__corner--left">${mm}.${dd}</span>
      <span class="mini-calendar__corner mini-calendar__corner--right">Tiệc cưới nhà trai</span>
      <div class="mini-calendar__overlay">
        <div class="mini-calendar__header">${monthNames[month]} ${year}</div>
        ${grid}
      </div>
    </div>
    <div class="mini-calendar__caption">
      <div class="event__sub">
        <p>Tiệc Cưới Nhà Trai</p>
        <p class="event__date">Chủ Nhật, 02.08.2026</p>
        <p class="event__time">11:00 Sáng</p>
      </div>
      <p class="event__venue">Khách Sạn Như Minh Plaza</p>
      <p class="event__address">41 Phạm Văn Đồng, TP. Đà Nẵng</p>
    </div>
  `;
}

function initMiniCalendarBride() {
  const el = document.getElementById('mini-calendar-bride');
  if (!el) return;

  const highlight = new Date(el.dataset.highlightDate);
  const year = highlight.getFullYear();
  const month = highlight.getMonth();
  const lunar = el.dataset.lunarDate || '';
  const timeLabel = el.dataset.timeLabel || '';

  const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const dowFull = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  const dow = ['CN','T2','T3','T4','T5','T6','T7'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(highlight.getDate()).padStart(2, '0');

  let grid = '<div class="mini-calendar__grid">';
  dow.forEach(d => grid += `<span class="dow">${d}</span>`);
  for (let i = 0; i < firstDay; i++) grid += '<span></span>';
  for (let day = 1; day <= daysInMonth; day++) {
    const isHighlight = day === highlight.getDate();
    const pin = isHighlight ? '<i class="mini-calendar__pin">&#10084;</i>' : '';
    grid += `<span class="mini-calendar__day${isHighlight ? ' is-highlight' : ''}">${pin}${day}</span>`;
  }
  grid += '</div>';

  el.innerHTML = `
    <div class="mini-calendar__photo">
      <img src="assets/decor/calendar1.jpg" alt="" />
      <span class="mini-calendar__corner mini-calendar__corner--left">${mm}.${dd}</span>
      <span class="mini-calendar__corner mini-calendar__corner--right">Tiệc cưới nhà gái</span>
      <div class="mini-calendar__overlay">
        <div class="mini-calendar__header">${monthNames[month]} ${year}</div>
        ${grid}
      </div>
    </div>
    <div class="mini-calendar__caption">
      <div class="event__sub">
        <p class="event__sub-label">Lễ Đính Hôn</p>
        <p class="event__date">Thứ Bảy, 25.07.2026</p>
        <p class="event__time">08:00 Sáng</p>
      </div>
      <div class="event__sub">
        <p class="event__sub-label">Tiệc Cưới Nhà Gái</p>
        <p class="event__date">Thứ Bảy, 25.07.2026</p>
        <p class="event__time">10:30 Sáng</p>
      </div>
      <p class="event__venue">Khách Sạn Đại Thành</p>
      <p class="event__address">Xã Yên Xuân, Tỉnh Nghệ An</p>
    </div>
  `;
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
   RSVP webhook (Power Automate)
   ============================================ */
const RSVP_WEBHOOK_URL =
  'https://default711d7bdc4e5347ee8054c3ea91f42e.87.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/20/workflows/84827523799e4807b0f697838aece35e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KNngyC5wsXcUB9uttkLOeaRSsW8kLORbxMbCZGXMH74';

async function submitRsvp({ name, attendanceNum, willAttend, note }) {
  const response = await fetch(RSVP_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Name: name,
      AttendanceNum: attendanceNum,
      WillAttend: willAttend,
      Note: note,
    }),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

/* ============================================
   RSVP form
   ============================================ */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;
  const thanks = document.getElementById('rsvp-thanks');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('#guest-name').value;
    const guestCount = form.querySelector('#guest-count').value;
    const message = form.querySelector('#guest-message').value;

    submitBtn.disabled = true;
    try {
      await submitRsvp({
        name,
        attendanceNum: Number(guestCount),
        willAttend: true,
        note: message,
      });
      form.reset();
      thanks.hidden = false;
    } catch (err) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ============================================
   Gift / wish message form (decline path)
   ============================================ */
function initGiftMessageForm() {
  const form = document.getElementById('gift-message-form');
  if (!form) return;
  const thanks = document.getElementById('gift-message-thanks');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('#guest-name').value;
    const message = form.querySelector('#gift-message').value;

    submitBtn.disabled = true;
    try {
      await submitRsvp({
        name,
        attendanceNum: 0,
        willAttend: false,
        note: message,
      });
      form.reset();
      thanks.hidden = false;
    } catch (err) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ============================================
   Gallery lightbox
   ============================================ */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const grid = document.querySelector('.gallery__grid');
  if (!lightbox || !grid) return;
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const counter = lightbox.querySelector('.lightbox__counter');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const images = Array.from(grid.querySelectorAll('img.gallery__item'));
  const moreCard = document.getElementById('galleryMore');

  // Shuffle the visual order of the photos on every reload.
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  images.forEach((img) => grid.appendChild(img));
  if (moreCard) grid.appendChild(moreCard);

  const moreCount = moreCard ? moreCard.querySelector('.gallery__more-count') : null;
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function open(index) {
    show(index);
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function close() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => open(index));
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(currentIndex + 1);
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
  });

  // Swipe left/right to navigate between photos on touch devices.
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const swipeThreshold = 40;
    if (deltaX > swipeThreshold) show(currentIndex - 1);
    else if (deltaX < -swipeThreshold) show(currentIndex + 1);
  }, { passive: true });

  // Only show up to 2 rows of photos; the rest fold into a "view more" card
  // that opens the lightbox from the first photo. Row height depends on
  // how many columns the responsive grid currently renders, so recompute
  // on resize.
  if (moreCard) {
    function updatePreview() {
      const columnCount = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const visibleSlots = columnCount * 2;

      if (images.length <= visibleSlots) {
        images.forEach((img) => img.classList.remove('is-hidden'));
        moreCard.hidden = true;
        return;
      }

      const showCount = visibleSlots - 1;
      images.forEach((img, index) => {
        img.classList.toggle('is-hidden', index >= showCount);
      });
      moreCard.hidden = false;
      moreCount.textContent = `+${images.length - showCount}`;
    }

    moreCard.addEventListener('click', () => open(0));
    window.addEventListener('resize', updatePreview);
    updatePreview();
  }
}

function selectRSVP(option){

    document.getElementById("attendCard").classList.remove("selected");
    document.getElementById("declineCard").classList.remove("selected");

    const gift = document.getElementById("giftSection");
    const attend = document.getElementById("attendSection");

    if(option === "attend"){

        document.getElementById("attendCard").classList.add("selected");
        attend.classList.add("show");
        gift.classList.remove("show");
        attend.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    }
    else{

        document.getElementById("declineCard").classList.add("selected");
        attend.classList.remove("show");
        gift.classList.add("show");

        gift.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }

}