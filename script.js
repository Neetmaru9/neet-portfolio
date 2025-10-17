// set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// optional: highlight current section link on scroll (beginner-friendly)
const links = document.querySelectorAll('.nav a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function onScroll() {
  const y = window.scrollY + 100;
  let active = null;
  for (const sec of sections) {
    if (sec.offsetTop <= y) active = sec.id;
  }
  links.forEach(a => {
    const isActive = a.getAttribute('href') === `#${active}`;
    a.style.fontWeight = isActive ? '700' : '500';
  });
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();
