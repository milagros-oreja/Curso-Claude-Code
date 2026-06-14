// ===== Menú móvil (hamburguesa) =====
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Cerrar el menú al tocar un enlace
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
})();

// ===== Botón "volver arriba" (se inyecta solo) =====
(function () {
  const btn = document.createElement('button');
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Volver arriba');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 700);
  });
})();

// ===== Modal de formulario (solo si existe en la página) =====
(function () {
  const modal = document.getElementById('modal');
  const openButtons = document.querySelectorAll('[data-open-form]');
  const closeButtons = document.querySelectorAll('[data-close-form]');
  if (!modal) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();

// ===== Envío de cualquier formulario de contacto =====
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí se conectaría con el backend o servicio (Formspree, etc.)
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Formulario enviado:', data);
    if (success) success.classList.add('is-visible');
    const submitBtn = form.querySelector('button[type="submit"]');
    const original = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) submitBtn.textContent = 'Enviado ✓';
    setTimeout(() => {
      const modal = document.getElementById('modal');
      if (modal) modal.classList.remove('is-open');
      document.body.style.overflow = '';
      form.reset();
      if (success) success.classList.remove('is-visible');
      if (submitBtn) submitBtn.textContent = original || 'Enviar';
    }, 2200);
  });
})();
