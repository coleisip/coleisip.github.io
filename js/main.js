/* Nav scroll state */
const nav = document.getElementById('nav');

if (nav) {
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile nav toggle */
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

if (navToggle && navMobile) {
  const bars = navToggle.querySelectorAll('.nav-toggle-bar');

  const closeMenu = () => {
    navMobile.classList.remove('is-open');
    navMobile.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    bars[0].style.transform = '';
    bars[1].style.transform = '';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navMobile.setAttribute('aria-hidden', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      bars[0].style.transform = 'translateY(7.5px) rotate(45deg)';
      bars[1].style.transform = 'translateY(-7.5px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.transform = '';
    }
  });

  navMobile.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Gallery hover popups — per-brand panels */
const galleryPopup = document.getElementById('gallery-popup');

if (galleryPopup) {
  /* Index all panels by their id suffix (e.g. "popup-gwg" → "gwg") */
  const panels = {};
  galleryPopup.querySelectorAll('.gwp[id]').forEach(panel => {
    panels[panel.id.replace('popup-', '')] = panel;
  });

  let hideTimer;

  const showPopup = (key) => {
    clearTimeout(hideTimer);
    Object.values(panels).forEach(p => { p.hidden = true; });
    if (panels[key]) panels[key].hidden = false;
    galleryPopup.classList.add('is-visible');
    galleryPopup.setAttribute('aria-hidden', 'false');
  };

  const hidePopup = () => {
    hideTimer = setTimeout(() => {
      galleryPopup.classList.remove('is-visible');
      galleryPopup.setAttribute('aria-hidden', 'true');
    }, 100);
  };

  document.querySelectorAll('.gallery-item[data-popup]').forEach(item => {
    item.addEventListener('mouseenter', () => showPopup(item.dataset.popup));
    item.addEventListener('mouseleave', hidePopup);
  });
}

/* Photo carousels — infinite wrapping */
document.querySelectorAll('.csp-carousel').forEach(carousel => {
  const track     = carousel.querySelector('.csp-carousel-track');
  const slides    = carousel.querySelectorAll('.csp-carousel-slide');
  const prevBtn   = carousel.querySelector('.csp-carousel-prev');
  const nextBtn   = carousel.querySelector('.csp-carousel-next');
  const currentEl = carousel.querySelector('.csp-carousel-current');
  const total     = slides.length;
  let current     = 0;

  const goTo = (index) => {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (currentEl) currentEl.textContent = current + 1;
  };

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  /* Arrow key support when the carousel region is focused */
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });
});

/* Scroll reveal via IntersectionObserver */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -32px 0px',
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
