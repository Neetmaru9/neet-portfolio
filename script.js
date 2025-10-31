// Wire up any .slider on the page that has .slider-btn controls
(function () {
  // Find all slider blocks
  const sliders = Array.from(document.querySelectorAll('.slider'));
  sliders.forEach((slider) => {
    // Find the nearest controls (assumes controls are in the same section)
    const section = slider.closest('section, main, body') || document;
    const prev = section.querySelector('.slider-controls .prev');
    const next = section.querySelector('.slider-controls .next');

    const slides = Array.from(slider.querySelectorAll('.slides .slide'));
    if (!slides.length || !prev || !next) return;

    let i = slides.findIndex(s => s.classList.contains('is-active'));
    if (i < 0) { i = 0; slides[0].classList.add('is-active'); slides[0].removeAttribute('aria-hidden'); }

    function show(n) {
      // hide current
      slides[i].classList.remove('is-active');
      slides[i].setAttribute('aria-hidden', 'true');

      // wrap around
      i = (n + slides.length) % slides.length;

      // show next
      slides[i].classList.add('is-active');
      slides[i].removeAttribute('aria-hidden');

      // (optional) update aria-label like "2 of 3"
      slides.forEach((s, idx) => s.setAttribute('aria-label', `${idx + 1} of ${slides.length}`));
    }

    prev.addEventListener('click', () => show(i - 1));
    next.addEventListener('click', () => show(i + 1));
  });
})();
