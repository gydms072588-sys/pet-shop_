document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const syncHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  const menu = document.querySelector('.menu-btn');
  menu?.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'close' : 'menu';
  });
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => {
    body.classList.remove('nav-open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = 'menu';
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    button.classList.toggle('on');
    button.textContent = 'favorite';
    button.setAttribute('aria-label', button.classList.contains('on') ? '위시리스트 제거' : '위시리스트 추가');
  }));

  document.querySelectorAll('.qty').forEach(control => {
    const value = control.querySelector('[data-qty-value]');
    control.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      const next = Math.max(1, Number(value.textContent) + Number(button.dataset.step));
      value.textContent = next;
    }));
  });

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(button => button.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab)?.classList.add('active');
  }));

  const promoSlides = [...document.querySelectorAll('.promo-slide')];
  const promoDots = [...document.querySelectorAll('.promo-slider-dots button')];
  if (promoSlides.length > 1) {
    let promoIndex = 0;
    const showPromoSlide = index => {
      promoIndex = (index + promoSlides.length) % promoSlides.length;
      promoSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === promoIndex));
      promoDots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === promoIndex));
    };
    let promoTimer = window.setInterval(() => showPromoSlide(promoIndex + 1), 4500);
    promoDots.forEach((dot, dotIndex) => dot.addEventListener('click', () => {
      window.clearInterval(promoTimer);
      showPromoSlide(dotIndex);
      promoTimer = window.setInterval(() => showPromoSlide(promoIndex + 1), 4500);
    }));
  }

  document.querySelectorAll('.remove').forEach(button => button.addEventListener('click', () => {
    const row = button.closest('.cart-row');
    row?.remove();
    const count = document.querySelectorAll('.cart-row').length;
    const countNode = document.querySelector('[data-cart-count]');
    if (countNode) countNode.textContent = String(count);
  }));

  document.querySelector('.to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
