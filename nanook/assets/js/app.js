const body = document.body;
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const topProgress = document.getElementById('topProgress');
const backTop = document.getElementById('backTop');

function updateScrollUi() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  header.classList.toggle('scrolled', scrollTop > 24);
  topProgress.style.width = `${progress}%`;
  if (backTop) {
    backTop.style.setProperty('--progress', `${progress}%`);
    backTop.classList.toggle('visible', scrollTop > 460);
  }
}

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  const icon = navToggle.querySelector('i');
  icon.className = navMenu.classList.contains('active') ? 'ti ti-x' : 'ti ti-menu-2';
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    const icon = navToggle?.querySelector('i');
    if (icon) icon.className = 'ti ti-menu-2';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
window.addEventListener('scroll', updateScrollUi, { passive: true });

body.setAttribute('data-theme', 'dark');
updateScrollUi();
