// ===== Navbar: muda estilo ao rolar =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Menu mobile =====
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // pequeno atraso escalonado entre irmãos próximos
      const delay = Math.min(i * 60, 240);
      setTimeout(() => entry.target.classList.add('in'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

// ===== Contadores animados =====
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const duration = 1400;
  const start = performance.now();
  const decimals = (el.dataset.count.split('.')[1] || '').length;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * easeOut(progress);
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString('pt-BR');
  }
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach((el) => countObserver.observe(el));

// ===== Brilho que segue o mouse no mock do hero =====
const mock = document.querySelector('.mock');
if (mock && window.matchMedia('(pointer:fine)').matches) {
  const visual = document.querySelector('.hero-visual');
  visual.addEventListener('mousemove', (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mock.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  visual.addEventListener('mouseleave', () => { mock.style.transform = ''; });
}
