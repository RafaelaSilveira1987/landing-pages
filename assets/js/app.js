const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');
const backtop = document.querySelector('.backtop');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.style.display = shouldShow ? '' : 'none';
    });
  });
});

window.addEventListener('scroll', () => {
  if (!backtop) return;
  backtop.classList.toggle('is-visible', window.scrollY > 520);
});
