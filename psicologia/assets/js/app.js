const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function updateBackToTop() {
  if (!backToTop) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
  const percentage = Math.round(progress * 100);

  backToTop.style.background = `conic-gradient(#1d1b19 ${percentage}%, rgba(29,27,25,.14) ${percentage}% 100%)`;
  backToTop.classList.toggle('is-visible', scrollTop > 260);
}

function setActiveNavLink() {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateBackToTop();
  setActiveNavLink();
  window.addEventListener('scroll', () => {
    updateBackToTop();
    setActiveNavLink();
  }, { passive: true });
  window.addEventListener('resize', () => {
    updateBackToTop();
    setActiveNavLink();
  });
}
