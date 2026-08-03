const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = isOpen ? '<i class="ti ti-x"></i>' : '<i class="ti ti-menu-2"></i>';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.innerHTML = '<i class="ti ti-menu-2"></i>';
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const careForm = document.querySelector('#careForm');
const phone = '5532998671907';

if (careForm) {
  careForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(careForm);
    const nome = formData.get('nome')?.toString().trim();
    const perfil = formData.get('perfil')?.toString().trim();
    const local = formData.get('local')?.toString().trim();
    const mensagem = formData.get('mensagem')?.toString().trim();

    const text = `Olá, meu nome é ${nome}. Preciso de orientação da Cuidar no Lar.\n\nQuem precisa de cuidado: ${perfil}\nLocal do cuidado: ${local}\nO que está acontecendo: ${mensagem}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}

let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (!header) return;
  header.style.boxShadow = currentScroll > 20 ? '0 12px 35px rgba(16,65,62,.08)' : 'none';
  lastScroll = currentScroll;
});

const backTop = document.querySelector('.back-top');

if (backTop) {
  backTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
