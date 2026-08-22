// @ts-nocheck
const LERP_EASE = 0.06;

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function setupLerpScroll({
  wrapperSelector = '#lerp-wrapper',
  ease = LERP_EASE,
} = {}) {
  const wrapper = document.querySelector(wrapperSelector);

  if (!wrapper) {
    console.warn(`setupLerpScroll: elemento "${wrapperSelector}" não encontrado.`);
    return;
  }

  let isFxEnabled = true;

  const fxToggleBtn = document.querySelector('.fx-toggle');
  let isMobile = window.innerWidth <= 768;

  if (fxToggleBtn) {
    fxToggleBtn.addEventListener('click', () => {
      isFxEnabled = !isFxEnabled;
      updateState();
    });
  }

  let currentEase = (isMobile || !isFxEnabled) ? 1 : ease;
  let current = window.scrollY;
  let target = window.scrollY;

  function updateState() {
    isMobile = window.innerWidth <= 768;
    currentEase = (isMobile || !isFxEnabled) ? 1 : ease;
  }

  function syncBodyHeight() {
    document.body.style.height = `${wrapper.offsetHeight}px`;
    updateState();
  }

  function raf() {
    target = window.scrollY;
    current = lerp(current, target, currentEase);


    if (Math.abs(current - target) < 0.1) {
      current = target;
    }

    const rounded = Math.round(current * 100) / 100;


    wrapper.style.transform = `translate3d(0, ${-rounded}px, 0)`;


    const disableFx = isMobile || !isFxEnabled;
    const bgEls = document.querySelectorAll('.bg-fixed');
    bgEls.forEach(el => {
      el.style.transform = disableFx ? 'translate3d(0, 0px, 0)' : `translate3d(0, ${rounded * 0.3}px, 0)`;
    });

    requestAnimationFrame(raf);
  }

  window.addEventListener('load', syncBodyHeight);
  window.addEventListener('resize', syncBodyHeight);

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(syncBodyHeight);
    resizeObserver.observe(wrapper);
  }

  syncBodyHeight();
  raf();
}




window.scrollToSection = function (sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {

    const rect = section.getBoundingClientRect();


    const targetY = rect.top + window.scrollY;


    window.scrollTo({
      top: targetY,
      behavior: 'auto'
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupLerpScroll();
});