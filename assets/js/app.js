const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.querySelector('[data-empty-state]');
const backtop = document.querySelector('.backtop');
const year = document.querySelector('[data-year]');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function syncHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 60);
  backtop?.classList.toggle('is-visible', window.scrollY > 520);
}

window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    let visibleCount = 0;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !shouldShow);

      if (shouldShow) {
        visibleCount += 1;
        card.classList.remove('is-revealed');
        window.setTimeout(() => card.classList.add('is-revealed'), 20);
      }
    });

    emptyState?.classList.toggle('is-visible', visibleCount === 0);
  });
});

const revealCards = document.querySelectorAll('.reveal-card:not(.is-revealed)');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealCards.forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    observer.observe(card);
  });
} else {
  revealCards.forEach((card) => card.classList.add('is-revealed'));
}
