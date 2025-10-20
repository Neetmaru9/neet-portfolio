// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Minimal carousel for any .slider
document.querySelectorAll('.slider').forEach(initSlider);
function initSlider(root){
  const track = root.querySelector('.slides');
  const slides = Array.from(root.querySelectorAll('.slide'));
  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if(index < 0) index = 0;

  const controls = root.previousElementSibling?.querySelectorAll('.slider-btn');
  const prevBtn = controls?.[0];
  const nextBtn = controls?.[1];

  function update(){
    slides.forEach((s,i) => {
      const active = i === index;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
      s.setAttribute('aria-label', `${i+1} of ${slides.length}`);
    });
    track.style.transform = `translateX(${-100*index}%)`;
  }
  function next(){ index = (index + 1) % slides.length; update(); }
  function prev(){ index = (index - 1 + slides.length) % slides.length; update(); }

  nextBtn && nextBtn.addEventListener('click', next);
  prevBtn && prevBtn.addEventListener('click', prev);

  // swipe on mobile
  let x0=null;
  root.addEventListener('pointerdown', e=>x0=e.clientX);
  root.addEventListener('pointerup', e=>{
    if(x0===null) return;
    const dx = e.clientX - x0;
    if(Math.abs(dx)>40) (dx<0?next:prev)();
    x0=null;
  });

  update();
}

// highlight nav while scrolling
const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll(){
  const y = window.scrollY + 120; let active = 'home';
  for(const sec of sections){ if(sec.offsetTop <= y) active = sec.id; }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();
