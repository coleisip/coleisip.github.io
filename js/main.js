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
